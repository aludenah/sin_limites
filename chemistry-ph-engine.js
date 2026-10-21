(function(global){
  'use strict';

  /* Ideal aqueous HCl/NaOH model at 25 °C. Amounts: mol; concentrations:
     mol/L; all public volumes: mL. Both reagents fully dissociate and volumes
     are additive. Activities, heat, CO2 and indicator consumption are omitted.
     References (definitions and independent worked titration examples):
     https://openstax.org/books/chemistry-2e/pages/14-1-bronsted-lowry-acids-and-bases
     https://openstax.org/books/chemistry-2e/pages/14-7-acid-base-titrations
     https://edu.rsc.org/experiments/indicators-and-dry-ice-demonstration/703.article
     Display colors interpolate reference transitions; they are not spectra.
  */
  const KW=1e-14,SQRT_KW=1e-7;
  const DEFAULTS=Object.freeze({sampleType:'acid',sampleVolumeMl:20,sampleConcentrationM:.1,titrantConcentrationM:.1,addedVolumeMl:0});
  const ASSUMPTIONS=Object.freeze({temperatureC:25,waterIonProduct:KW,ideal:true,fullyDissociated:true,additiveVolumes:true,stoichiometry:'1:1',sampleAcid:'HCl',sampleBase:'NaOH'});

  function finite(value,name,min,strict=false){
    if(typeof value!=='number'||!Number.isFinite(value)||(strict?value<=min:value<min))throw new RangeError(name+' fuera del dominio del modelo.');
    return value;
  }
  function configuration(input={}){
    if(!input||typeof input!=='object'||Array.isArray(input))throw new TypeError('La configuración debe ser un objeto.');
    const c={...DEFAULTS,...input};
    if(c.sampleType!=='acid'&&c.sampleType!=='base')throw new RangeError('sampleType debe ser acid o base.');
    finite(c.sampleVolumeMl,'sampleVolumeMl',0,true);
    finite(c.sampleConcentrationM,'sampleConcentrationM',0);
    finite(c.titrantConcentrationM,'titrantConcentrationM',0,true);
    finite(c.addedVolumeMl,'addedVolumeMl',0);
    return c;
  }

  function calculate(input={}){
    const c=configuration(input),sampleMoles=c.sampleConcentrationM*(c.sampleVolumeMl/1000),titrantMoles=c.titrantConcentrationM*(c.addedVolumeMl/1000),totalVolumeMl=c.sampleVolumeMl+c.addedVolumeMl,totalVolumeL=totalVolumeMl/1000;
    const equivalenceVolumeMl=c.sampleConcentrationM/c.titrantConcentrationM*c.sampleVolumeMl;
    if(![sampleMoles,titrantMoles,totalVolumeMl,totalVolumeL,equivalenceVolumeMl].every(Number.isFinite)||totalVolumeL<=0)throw new RangeError('Las cantidades exceden el dominio numérico del modelo.');
    const acidMoles=c.sampleType==='acid'?sampleMoles:titrantMoles,baseMoles=c.sampleType==='base'?sampleMoles:titrantMoles;
    let excessSignedMoles=acidMoles-baseMoles;
    // Remove only cancellation at machine precision, never genuine dilution.
    if(Math.abs(excessSignedMoles)<=32*Number.EPSILON*Math.max(acidMoles,baseMoles))excessSignedMoles=0;
    const excessConcentrationM=excessSignedMoles/totalVolumeL;
    if(!Number.isFinite(excessConcentrationM))throw new RangeError('La concentración excede el dominio numérico del modelo.');
    // Charge balance: [H3O+] - [OH-] = [Cl-] - [Na+]. Coupled with Kw,
    // the positive quadratic root is evaluated without subtractive cancellation.
    const root=Math.hypot(excessConcentrationM,2*SQRT_KW);
    let h3oM,ohM;
    if(excessConcentrationM>=0){h3oM=excessConcentrationM/2+root/2;ohM=KW/h3oM;}
    else{ohM=-excessConcentrationM/2+root/2;h3oM=KW/ohM;}
    const naM=baseMoles/totalVolumeL,clM=acidMoles/totalVolumeL,pH=-Math.log10(h3oM),pOH=-Math.log10(ohM);
    if(![h3oM,ohM,naM,clM,pH,pOH].every(Number.isFinite)||h3oM<=0||ohM<=0)throw new RangeError('El resultado excede el dominio numérico del modelo.');
    return {
      pH,pOH,h3oM,ohM,sampleMoles,titrantMoles,acidMoles,baseMoles,totalVolumeMl,equivalenceVolumeMl,
      excessType:excessSignedMoles>0?'acid':excessSignedMoles<0?'base':'none',
      excessMoles:Math.abs(excessSignedMoles),excessConcentrationM,neutralizedMoles:Math.min(acidMoles,baseMoles),
      naM,clM,sampleSolute:c.sampleType==='acid'?'HCl':'NaOH',titrantSolute:c.sampleType==='acid'?'NaOH':'HCl',
      // The amount neutralized is the formal 1:1 stoichiometric amount. It is
      // not a count of water molecules in a microscopic display.
      assumptions:ASSUMPTIONS
    };
  }

  const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
  const mix=(a,b,u)=>'#'+a.map((x,i)=>Math.round(x+(b[i]-x)*u).toString(16).padStart(2,'0')).join('');
  const CLEAR='rgba(200, 230, 245, 0.16)';
  function indicator(pH,type='bromothymol'){
    finite(pH,'pH',-Infinity);
    const note='Color orientativo de una cantidad traza de indicador; no modifica el pH calculado.';
    if(type==='none')return {color:CLEAR,label:'Sin indicador · incoloro',fraction:0,range:null,visibleColor:false,note};
    if(type==='bromothymol'){
      const fraction=clamp((pH-6)/1.6),yellow=[239,205,69],green=[95,183,109],blue=[52,132,204];
      const color=pH<=7?mix(yellow,green,clamp(pH-6)):mix(green,blue,clamp((pH-7)/.6));
      return {color,label:pH<=6?'Amarillo':pH>=7.6?'Azul':'Verde de transición',fraction,range:[6,7.6],visibleColor:true,note};
    }
    if(type==='phenolphthalein'){
      const fraction=clamp((pH-8.2)/1.8);
      return {color:fraction===0?CLEAR:mix([252,236,245],[228,83,153],fraction),label:fraction===0?'Incoloro':fraction<1?'Rosa de transición':'Rosa',fraction,range:[8.2,10],visibleColor:fraction>0,note:note+' Se representa su viraje habitual; no la decoloración lenta en medios muy alcalinos.'};
    }
    if(type==='universal'){
      // A conventional teaching scale, not a universal formulation or spectrum.
      const stops=[[0,[203,49,71]],[2,[234,70,54]],[4,[239,144,48]],[6,[229,204,67]],[7,[88,177,105]],[8,[42,164,154]],[10,[58,114,192]],[12,[109,76,179]],[14,[137,56,145]]];
      const value=clamp(pH,0,14);let i=0;while(i<stops.length-2&&value>stops[i+1][0])i++;
      const left=stops[i],right=stops[i+1],color=mix(left[1],right[1],(value-left[0])/(right[0]-left[0]));
      return {color,label:pH<7?'Tono ácido':pH>7?'Tono básico':'Verde neutro',fraction:value/14,range:[0,14],visibleColor:true,note};
    }
    throw new RangeError('Indicador desconocido.');
  }

  function curve(input={},options={}){
    const c=configuration(input);
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('Las opciones deben ser un objeto.');
    const maxVolumeMl=options.maxVolumeMl??100,points=options.points??101;
    finite(maxVolumeMl,'maxVolumeMl',0,true);
    if(!Number.isInteger(points)||points<2||points>1001)throw new RangeError('points debe ser un entero entre 2 y 1001.');
    const step=maxVolumeMl/(points-1),volumes=new Set();
    for(let i=0;i<points;i++)volumes.add(i===points-1?maxVolumeMl:i*step);
    const eq=calculate(c).equivalenceVolumeMl;
    // Explicitly sample equivalence and its steep neighborhood so the graph
    // remains meaningful even when equivalence lies between uniform samples.
    if(eq>=0&&eq<=maxVolumeMl){
      volumes.add(eq);
      for(const factor of [-1,-.1,-.01,.01,.1,1]){
        const v=eq+step*.25*factor;if(v>=0&&v<=maxVolumeMl)volumes.add(v);
      }
    }
    if(c.addedVolumeMl<=maxVolumeMl)volumes.add(c.addedVolumeMl);
    return [...volumes].sort((a,b)=>a-b).map(volumeMl=>({volumeMl,pH:calculate({...c,addedVolumeMl:volumeMl}).pH}));
  }

  const api=Object.freeze({calculate,indicator,curve,defaults:DEFAULTS,assumptions:ASSUMPTIONS,KW});
  global.ChemistryPH=api;
  if(typeof module==='object'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
