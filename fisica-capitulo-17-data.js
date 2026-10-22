'use strict';
window.ELECTROMAGNETISM_CONTENT = {
  "number": 17,
  "id": "fisica-capitulo-17",
  "progressId": "fisica-capitulo-17",
  "courseId": 16,
  "courseName": "Física",
  "title": "Electromagnetismo",
  "intro": "Comprende el magnetismo de los imanes, descubre cómo una corriente produce campo y explora un conductor rectilíneo desde diferentes planos. Estudia la teoría, compara diez problemas resueltos y practica con diez problemas propuestos.",
  "version": 2,
  "format": "physics",
  "assessmentFormat": "practice-10",
  "sourceNote": "Explicaciones, esquemas y problemas elaborados para SIN LÍMITES. Referencias de consulta: OpenStax, University Physics Volume 2, capítulos 11, 12 y 13. Se indican las condiciones y aproximaciones de cada modelo.",
  "lessons": [
    {
      "id": "magnetismo-imanes",
      "title": "Magnetismo e imanes",
      "subtitle": "Polos, materiales e imantación",
      "goal": "Reconoce los polos de un imán y explica por qué un fragmento conserva ambos polos.",
      "body": "<p>Un imán permite atraer ciertos materiales y ejercer fuerzas sobre otros imanes sin contacto directo. Puede ser de barra, herradura o disco. Sus dos regiones polares se denominan <strong>norte (N)</strong> y <strong>sur (S)</strong>.</p><div class=\"table-scroll\"><table><thead><tr><th>Polos enfrentados</th><th>Interacción</th></tr></thead><tbody><tr><td>N con N o S con S</td><td>Repulsión</td></tr><tr><td>N con S</td><td>Atracción</td></tr></tbody></table></div><p>Si cortamos un imán de barra transversalmente, cada fragmento conserva un polo norte y uno sur. Las nuevas caras de corte presentan polos opuestos. <strong>Cortar el imán no permite obtener polos aislados.</strong></p><h4>¿Todos los metales se atraen con fuerza?</h4><p>No. El hierro, el níquel y el cobalto son ejemplos de materiales ferromagnéticos. Un clavo de hierro puede imantarse al acercarle un imán; que sea atraído no demuestra que antes fuera un imán permanente. La respuesta intensa del hierro no se generaliza a todos los metales.</p><h4>Una mirada al interior: dominios magnéticos</h4><p>En un material ferromagnético existen regiones llamadas <strong>dominios</strong>, con momentos magnéticos alineados en su interior. En una muestra sin imantación global, las orientaciones de distintos dominios pueden compensarse. Al imantarla, unas orientaciones pasan a predominar. Según el material y su historia, parte de esa imantación puede conservarse al retirar el campo externo.</p><div class=\"key\"><b>Idea clave</b>Polos iguales se repelen y polos diferentes se atraen. Cada fragmento de un imán sigue siendo un dipolo: posee N y S.</div><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/11-1-magnetism-and-its-historical-discoveries\" target=\"_blank\" rel=\"noopener noreferrer\">Imanes y polos · OpenStax</a>.</p><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/12-7-magnetism-in-matter\" target=\"_blank\" rel=\"noopener noreferrer\">Magnetismo en la materia · OpenStax</a>.</p>",
      "examples": []
    },
    {
      "id": "campo-magnetico",
      "title": "Campo magnético y líneas de campo",
      "subtitle": "Representar una magnitud vectorial",
      "goal": "Interpreta la dirección de B y distingue vectores en el plano, entrantes y salientes.",
      "body": "<p>El <strong>campo magnético</strong> \\(\\vec B\\) describe la interacción magnética en cada punto. Es un vector: tiene magnitud, dirección y sentido. Su unidad del SI es el tesla.</p><div class=\"equation\">\\[1\\,\\mathrm T=1\\,\\frac{\\mathrm N}{\\mathrm{A\\cdot m}}\\qquad1\\,\\mathrm{mT}=10^{-3}\\,\\mathrm T\\qquad1\\,\\mu\\mathrm T=10^{-6}\\,\\mathrm T\\]</div><p>Una brújula libre de girar orienta su extremo norte aproximadamente en el sentido de la componente del campo que está en su plano de giro. Las limaduras de hierro ayudan a visualizar un patrón, pero no convierten las líneas del dibujo en objetos materiales.</p><h4>Cómo leer las líneas</h4><ul><li>La tangente a una línea indica la dirección local de \\(\\vec B\\).</li><li>En una representación comparable, una mayor concentración de líneas señala un campo más intenso.</li><li>Las líneas no se cruzan: el campo tiene una sola dirección en cada punto donde es distinto de cero.</li><li>En el exterior de un imán van de N a S; el recorrido se cierra por su interior de S a N.</li></ul><figure class=\"dimensional-figure\"><svg viewBox=\"0 0 640 310\" role=\"img\" aria-labelledby=\"em-magnet-title\" style=\"display:block;width:100%;height:auto\"><title id=\"em-magnet-title\">Imán de barra: líneas exteriores del norte al sur y retorno interior del sur al norte</title><defs><marker id=\"em-mag-arrow\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0 0L8 4L0 8Z\" fill=\"#157859\"/></marker></defs><rect x=\"190\" y=\"130\" width=\"130\" height=\"66\" rx=\"8\" fill=\"#dc4b54\"/><path d=\"M320 130H442Q450 130 450 138V188Q450 196 442 196H320Z\" fill=\"#285f9b\"/><g fill=\"white\" font-family=\"sans-serif\" font-size=\"28\" font-weight=\"700\" text-anchor=\"middle\"><text x=\"255\" y=\"172\">N</text><text x=\"385\" y=\"172\">S</text></g><g stroke=\"#157859\" stroke-width=\"3\" fill=\"none\" marker-end=\"url(#em-mag-arrow)\"><path d=\"M190 148C85 145 100 48 260 48H380C540 48 555 145 450 148\"/><path d=\"M190 180C85 185 100 275 260 275H380C540 275 555 185 450 180\"/><path d=\"M362 163H280\"/></g><g fill=\"#157859\"><path d=\"M315 42L327 48L315 54Z\"/><path d=\"M315 269L327 275L315 281Z\"/></g><g font-family=\"sans-serif\" font-size=\"17\" fill=\"#354b65\" text-anchor=\"middle\"><text x=\"320\" y=\"27\">Exterior: N → S</text><text x=\"320\" y=\"228\">Interior: S → N</text></g></svg><figcaption>Las flechas indican el sentido de B. Las curvas representan lazos cerrados; no son trayectorias de partículas.</figcaption></figure><h4>Vectores perpendiculares a una pantalla</h4><div class=\"table-scroll\"><table><thead><tr><th>Símbolo</th><th>Lectura</th><th>Imagen mental</th></tr></thead><tbody><tr><td><strong>⊙</strong></td><td>Sale de la pantalla hacia ti</td><td>Ves la punta de una flecha</td></tr><tr><td><strong>⊗</strong></td><td>Entra en la pantalla y se aleja de ti</td><td>Ves la cola de una flecha</td></tr></tbody></table></div><div class=\"key\"><b>Idea clave</b>Una línea muestra la dirección del campo. Su forma y su sentido deben interpretarse desde la vista indicada.</div><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines\" target=\"_blank\" rel=\"noopener noreferrer\">Campos magnéticos y líneas · OpenStax</a>.</p>",
      "examples": []
    },
    {
      "id": "experimento-oersted",
      "title": "Experimento de Oersted",
      "subtitle": "Una corriente desvía una brújula",
      "goal": "Relaciona la corriente eléctrica con el campo magnético que produce.",
      "body": "<p>En 1820, <strong>Hans Christian Oersted</strong> dio a conocer que una corriente en un conductor puede desviar una brújula cercana. La observación conectó electricidad y magnetismo: <strong>las cargas en movimiento producen campo magnético</strong>.</p><h4>Comparación de tres situaciones</h4><div class=\"table-scroll\"><table><thead><tr><th>Situación</th><th>Campo del conductor</th><th>Brújula</th></tr></thead><tbody><tr><td>Corriente nula</td><td>Nulo en el modelo del hilo</td><td>Responde al campo terrestre y a otros campos presentes</td></tr><tr><td>Circula corriente</td><td>Aparece alrededor del hilo</td><td>Puede desviarse respecto a su orientación inicial</td></tr><tr><td>Invertimos la corriente</td><td>Se invierte en cada punto</td><td>La desviación cambia de sentido en una disposición adecuada</td></tr></tbody></table></div><p>La brújula responde al <strong>campo total</strong>, no solamente al del hilo. Si el campo terrestre es relevante, invertir la corriente no obliga a la aguja a girar exactamente 180°. Para aislar el efecto en el modelo, compara el campo del conductor por separado.</p><h4>Regla de la mano derecha para un hilo</h4><ol><li>Imagina que sujetas el conductor con la <strong>mano derecha</strong>.</li><li>Apunta el pulgar en el sentido de la <strong>corriente convencional</strong>.</li><li>Los dedos que rodean el hilo indican el sentido de las circunferencias de campo.</li></ol><p>Visto perpendicularmente al hilo: si la corriente sale hacia ti, <strong>⊙</strong>, el campo gira en sentido <strong>antihorario</strong>. Si entra, <strong>⊗</strong>, gira en sentido <strong>horario</strong>. En un conductor metálico, el movimiento de los electrones tiene sentido opuesto al de la corriente convencional.</p><div class=\"key\"><b>Idea clave</b>La corriente produce el campo. La brújula permite detectar su efecto y el sentido local del campo resultante.</div><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/12-2-magnetic-field-due-to-a-thin-straight-wire\" target=\"_blank\" rel=\"noopener noreferrer\">Oersted y campos producidos por corrientes · OpenStax</a>.</p>",
      "examples": [
        {
          "title": "Mismo punto, corriente opuesta",
          "question": "Un hilo atraviesa perpendicularmente la hoja. La corriente sale hacia ti. ¿Hacia dónde apunta el campo en un punto situado a su derecha?",
          "steps": [
            "Con el pulgar derecho hacia ti, los dedos rodean el hilo en sentido antihorario.",
            "En el extremo derecho de esa circunferencia, la tangente apunta hacia arriba.",
            "Al invertir la corriente, el campo en ese mismo punto apunta hacia abajo."
          ]
        }
      ]
    },
    {
      "id": "biot-savart",
      "title": "Ley de Biot–Savart y conductor rectilíneo",
      "subtitle": "Calcular el campo de una corriente",
      "goal": "Relaciona la geometría de la corriente con B y aplica el resultado para un hilo largo.",
      "body": "<p>La <strong>ley de Biot–Savart</strong> permite calcular el campo de una distribución de corriente estacionaria. Se divide imaginariamente el conductor en pequeños elementos: cada uno aporta un vector de campo y después se suman todas las contribuciones.</p><div class=\"equation\">\\[\\mathrm d\\vec B=\\frac{\\mu_0}{4\\pi}\\frac{I\\,\\mathrm d\\vec\\ell\\times\\hat{\\boldsymbol R}}{R^2}\\]</div><ul><li>\\(\\mathrm d\\vec\\ell\\) apunta en el sentido de la corriente convencional, con \\(I\\geq0\\) para esta escritura.</li><li>\\(\\boldsymbol R\\) va desde el elemento de conductor hasta el punto de observación; \\(R\\) es su longitud y \\(\\hat{\\boldsymbol R}\\) su vector unitario.</li><li>El producto vectorial determina un aporte perpendicular a \\(\\mathrm d\\vec\\ell\\) y a \\(\\boldsymbol R\\).</li></ul><div class=\"equation\">\\[\\vec B=\\frac{\\mu_0}{4\\pi}\\int_{\\text{conductor}}\\frac{I\\,\\mathrm d\\vec\\ell\\times\\hat{\\boldsymbol R}}{R^2}\\]</div><p>La integral expresa esa suma continua; en este nivel usaremos su resultado para la geometría rectilínea. En el vacío tomamos \\(\\mu_0\\approx4\\pi\\times10^{-7}\\,\\mathrm{T\\cdot m/A}\\).</p><h4>Resultado para un conductor muy largo</h4><div class=\"equation\">\\[\\boxed{B=\\frac{\\mu_0|I|}{2\\pi r}}\\qquad B=2\\times10^{-7}\\frac{|I|}{r}\\;\\text{(en SI)}\\]</div><p>Aquí <strong>\\(r\\) es la distancia perpendicular al eje del hilo</strong>, distinta de la distancia \\(R\\) a cada elemento utilizada antes. La expresión es válida fuera de un conductor rectilíneo ideal muy largo; aproxima bien un hilo real si el punto está lejos de sus extremos y su radio es pequeño frente a \\(r\\). Para aire usamos aproximadamente la permeabilidad del vacío. No se aplica en \\(r=0\\), ni se extrapola al interior del material.</p><div class=\"table-scroll\"><table><thead><tr><th>Cambio aislado</th><th>Efecto en la magnitud B</th></tr></thead><tbody><tr><td>Duplicar |I|, conservar r</td><td>Se duplica</td></tr><tr><td>Duplicar r, conservar I</td><td>Se reduce a la mitad</td></tr><tr><td>Invertir I, conservar |I| y r</td><td>Igual magnitud, sentido opuesto</td></tr><tr><td>I = 0</td><td>Campo del hilo nulo; pueden existir otros campos</td></tr></tbody></table></div><h4>Superposición: más de un conductor</h4><div class=\"equation\">\\[\\vec B_{\\text{total}}=\\vec B_1+\\vec B_2+\\cdots\\]</div><p>Calcula cada magnitud y determina cada sentido antes de sumar. Entre dos hilos paralelos con corrientes del mismo sentido, sus campos son opuestos; se anulan en el punto medio solo si las corrientes tienen igual magnitud. Para corrientes de sentidos opuestos, sus campos en ese punto se refuerzan.</p><div class=\"key\"><b>Idea clave</b>Biot–Savart suma aportes vectoriales. Para un hilo largo, B disminuye como 1/r y sus líneas rodean el eje del conductor.</div><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/12-1-the-biot-savart-law\" target=\"_blank\" rel=\"noopener noreferrer\">Ley de Biot–Savart · OpenStax</a>.</p><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/12-2-magnetic-field-due-to-a-thin-straight-wire\" target=\"_blank\" rel=\"noopener noreferrer\">Campo de un hilo rectilíneo · OpenStax</a>.</p>",
      "examples": []
    },
    {
      "id": "laboratorio-conductor",
      "title": "Laboratorio: campo de un conductor",
      "subtitle": "Un mismo campo en diferentes planos",
      "goal": "Explora cómo cambian la magnitud y la representación de B al variar I, r y la vista.",
      "body": "<p>El conductor sigue el eje \\(z\\). Explora su campo desde una vista espacial, un plano <strong>transversal</strong> perpendicular al hilo y planos <strong>longitudinales</strong> que lo contienen. Cambiar de vista no cambia el fenómeno: cambia cómo lo representamos.</p><div data-wire-field-lab></div><h4>Guía de exploración</h4><ol><li><strong>Predice:</strong> fija una distancia y decide qué ocurrirá con B al duplicar la corriente. Compruébalo con la lectura numérica.</li><li><strong>Compara:</strong> conserva la corriente y duplica la distancia al eje. Describe qué cambia y qué se mantiene.</li><li><strong>Invierte:</strong> cambia el sentido de la corriente y observa el vector del campo en el mismo punto.</li><li><strong>Cambia de plano:</strong> identifica las circunferencias en el plano transversal y los símbolos entrantes o salientes en el longitudinal.</li><li><strong>Desconecta:</strong> lleva la corriente a cero y distingue el campo del hilo de otros campos si el simulador los muestra.</li></ol><p>Las flechas animadas indican el <strong>sentido del campo magnético</strong>. Con corriente constante, el campo de este modelo es estacionario; las líneas son una representación vectorial. El hilo dibujado tiene longitud finita por motivos de visualización, pero el cálculo usa la aproximación de hilo muy largo.</p><div class=\"key\"><b>Idea clave</b>En el plano transversal, B es tangente a circunferencias. En un plano longitudinal que contiene el hilo, B es perpendicular a ese plano en los puntos fuera del eje.</div>",
      "examples": []
    },
    {
      "id": "fuerzas-magneticas",
      "title": "Fuerzas magnéticas",
      "subtitle": "Sobre cargas en movimiento y conductores",
      "goal": "Distingue producir un campo de experimentar una fuerza debida a un campo externo.",
      "body": "<h4>Sobre una carga en movimiento</h4><div class=\"equation\">\\[\\vec F=q\\,\\vec v\\times\\vec B\\qquad\\boxed{F=|q|vB\\operatorname{sen}\\theta}\\]</div><p>El ángulo \\(\\theta\\) se mide entre la velocidad y el campo. Si la carga está en reposo, o se mueve paralela o antiparalelamente a B, la fuerza magnética es cero. Para movimiento perpendicular es máxima.</p><ol><li>Para una carga positiva, gira los dedos derechos desde \\(\\vec v\\) hacia \\(\\vec B\\) por el giro menor: el pulgar indica \\(\\vec F\\).</li><li>Si la carga es negativa, invierte el sentido obtenido.</li></ol><p>La fuerza magnética sobre una carga puntual es perpendicular a su velocidad. Por sí sola puede desviar la trayectoria, pero no realiza trabajo ni cambia su rapidez.</p><h4>Sobre un tramo de conductor</h4><div class=\"equation\">\\[\\vec F=I\\,\\vec L\\times\\vec B_{\\text{ext}}\\qquad\\boxed{F=B_{\\text{ext}}IL\\operatorname{sen}\\theta}\\]</div><p>Esta expresión se aplica a un tramo recto completamente inmerso en un campo externo uniforme. El vector \\(\\vec L\\) tiene longitud L y apunta en el sentido de la corriente convencional. El ángulo es el que forman la corriente y el campo.</p><p>Un conductor <strong>produce su propio campo</strong>; además, puede experimentar una fuerza por un <strong>campo externo</strong>. Esta segunda interacción permite generar movimiento en motores. Entre dos hilos largos paralelos, corrientes del mismo sentido se atraen y corrientes de sentidos opuestos se repelen.</p><div class=\"table-scroll\"><table><thead><tr><th>Pregunta</th><th>Relación</th></tr></thead><tbody><tr><td>¿Qué campo produce un hilo largo?</td><td>\\(B=\\mu_0|I|/(2\\pi r)\\)</td></tr><tr><td>¿Qué fuerza recibe una carga?</td><td>\\(F=|q|vB\\operatorname{sen}\\theta\\)</td></tr><tr><td>¿Qué fuerza recibe un tramo recto?</td><td>\\(F=B_{\\text{ext}}IL\\operatorname{sen}\\theta\\)</td></tr></tbody></table></div><div class=\"key\"><b>Idea clave</b>El campo se mide en teslas; la fuerza, en newtons. Identifica qué fuente produce B y sobre qué objeto actúa la fuerza.</div><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines\" target=\"_blank\" rel=\"noopener noreferrer\">Fuerza magnética sobre cargas · OpenStax</a>.</p><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/12-3-magnetic-force-between-two-parallel-currents\" target=\"_blank\" rel=\"noopener noreferrer\">Fuerza entre corrientes paralelas · OpenStax</a>.</p>",
      "examples": []
    },
    {
      "id": "flujo-faraday",
      "title": "Flujo magnético y ley de Faraday",
      "subtitle": "Importa el cambio de flujo",
      "goal": "Calcula el flujo y distingue fem instantánea de fem media.",
      "body": "<p>Para una espira plana de área A en un campo uniforme, el <strong>flujo magnético</strong> es:</p><div class=\"equation\">\\[\\boxed{\\Phi=BA\\cos\\theta}\\qquad1\\,\\mathrm{Wb}=1\\,\\mathrm{T\\cdot m^2}\\]</div><p>El ángulo se mide entre \\(\\vec B\\) y la <strong>normal</strong> a la superficie: un vector perpendicular al plano de la espira. No es el ángulo con el propio plano. Elegir la normal fija el signo del flujo.</p><div class=\"table-scroll\"><table><thead><tr><th>Orientación de B</th><th>Ángulo con la normal</th><th>Flujo</th></tr></thead><tbody><tr><td>En el sentido de la normal</td><td>0°</td><td>+BA</td></tr><tr><td>Paralelo al plano</td><td>90°</td><td>0</td></tr><tr><td>Opuesto a la normal</td><td>180°</td><td>−BA</td></tr></tbody></table></div><h4>Ley de Faraday</h4><p>Para una bobina con N espiras que comparten el mismo flujo por espira:</p><div class=\"equation\">\\[\\varepsilon=-N\\frac{\\mathrm d\\Phi}{\\mathrm dt}\\qquad\\varepsilon_{\\text{media}}=-N\\frac{\\Delta\\Phi}{\\Delta t}\\]</div><p>El flujo cambia si varía el campo, el área o la orientación. La <strong>fuerza electromotriz (fem)</strong> se mide en voltios, aunque su nombre incluya la palabra «fuerza». El signo se interpreta con una normal y un sentido de recorrido asociados por la mano derecha.</p><p>La fem instantánea depende de la pendiente del flujo en ese instante; la fem media usa el cambio entre dos extremos de un intervalo. Coinciden si el flujo varía linealmente durante él. Un flujo grande y constante no induce fem; un flujo que pasa por cero sí puede tener una pendiente no nula.</p><div class=\"key\"><b>Idea clave</b>No confundir B, flujo y fem: B describe el campo, Φ depende de la superficie y ε depende del cambio temporal de Φ.</div><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law\" target=\"_blank\" rel=\"noopener noreferrer\">Flujo y ley de Faraday · OpenStax</a>.</p>",
      "examples": []
    },
    {
      "id": "ley-lenz",
      "title": "Ley de Lenz y circuito abierto",
      "subtitle": "El sentido de la inducción",
      "goal": "Determina el sentido inducido y separa la existencia de fem de la circulación de corriente.",
      "body": "<p>La <strong>ley de Lenz</strong> establece que el efecto de la corriente inducida se opone al <strong>cambio del flujo</strong> que la origina. No significa que el campo inducido siempre sea contrario al campo externo.</p><ol><li>Identifica el sentido del campo externo a través de la espira.</li><li>Decide si su flujo aumenta o disminuye.</li><li>Elige el campo inducido que contrarresta ese cambio.</li><li>Aplica la mano derecha a la espira para obtener el sentido de la corriente.</li></ol><div class=\"table-scroll\"><table><thead><tr><th>Flujo externo entrante ⊗</th><th>Campo inducido necesario</th><th>Corriente vista de frente</th></tr></thead><tbody><tr><td>Aumenta</td><td>Saliente ⊙</td><td>Antihoraria</td></tr><tr><td>Disminuye</td><td>Entrante ⊗</td><td>Horaria</td></tr></tbody></table></div><h4>Puede haber fem sin corriente sostenida</h4><p>Mientras cambia el flujo, una bobina abierta puede presentar una fem entre sus terminales. Sin una trayectoria conductora cerrada, no circula corriente sostenida por la carga en el modelo del laboratorio. Si el circuito resistivo está cerrado:</p><div class=\"equation\">\\[I=\\frac{\\varepsilon}{R}\\]</div><p>El laboratorio desprecia la autoinducción, la capacitancia y los transitorios de conexión; por eso, en el circuito cerrado, la corriente sigue instantáneamente a ε/R. Una bobina real puede tener respuestas transitorias diferentes. Mantén la misma referencia de terminales para comparar signos.</p><div class=\"key\"><b>Idea clave</b>Lenz se opone al cambio del flujo. Una fem inducida puede existir con el circuito abierto y corriente sostenida nula.</div><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/13-2-lenzs-law\" target=\"_blank\" rel=\"noopener noreferrer\">Ley de Lenz y conservación de la energía · OpenStax</a>.</p>",
      "examples": [
        {
          "title": "Una bobina y dos lecturas",
          "question": "Un cambio de flujo induce una fem de 3 V. La resistencia total del circuito cerrado es 15 Ω. ¿Qué sucede al abrirlo?",
          "steps": [
            "Con el circuito cerrado y en el modelo resistivo: \\(I=3/15=0{,}20\\,\\mathrm A\\).",
            "Al abrir el circuito, la corriente sostenida por la carga se vuelve cero.",
            "Si el flujo continúa cambiando del mismo modo, la fem puede seguir siendo 3 V."
          ]
        }
      ]
    },
    {
      "id": "generador",
      "title": "Generador y laboratorio de inducción",
      "subtitle": "Del movimiento a la energía eléctrica",
      "goal": "Relaciona giro, señales y energía, y contrasta el modelo con el laboratorio.",
      "body": "<h4>Una bobina que gira</h4><p>Una bobina de N espiras y área A gira con velocidad angular constante \\(\\omega\\) en un campo uniforme B. Si la normal comienza alineada con el campo, \\(\\theta=\\omega t\\):</p><div class=\"equation\">\\[\\Phi=BA\\cos(\\omega t)\\qquad\\varepsilon=NBA\\omega\\operatorname{sen}(\\omega t)\\]</div><div class=\"equation\">\\[\\varepsilon_0=NBA|\\omega|\\qquad f=\\frac{|\\omega|}{2\\pi}\\qquad T=\\frac{2\\pi}{|\\omega|}\\]</div><p>Al alcanzar el flujo un máximo o un mínimo, su pendiente y la fem instantánea son cero. Cuando el flujo cruza por cero, la magnitud de la pendiente y de la fem es máxima. La señal cambia de signo cada media vuelta.</p><p>Duplicar N duplica la amplitud de la fem y conserva la frecuencia. Duplicar |ω| duplica ambas. Estas comparaciones suponen que las demás variables no cambian.</p><h4>¿De dónde procede la energía?</h4><p>El generador transforma <strong>trabajo mecánico en energía eléctrica</strong>. Mantener el giro bajo carga exige aporte externo contra el efecto electromagnético. El imán permite la interacción, pero no entrega energía ilimitada. En el modelo resistivo ideal cerrado, la carga recibe potencia \\(P=I^2R=\\varepsilon I\\).</p><div data-induction-lab></div><h4>Investiga una variable cada vez</h4><ol><li>Compara el mismo recorrido del imán con dos rapideces distintas. Para comparar la fem, usa posiciones equivalentes.</li><li>Detén el imán. Comprueba que el flujo puede mantenerse distinto de cero aunque la fem se anule.</li><li>Invierte los polos y repite el recorrido: compara los signos con la misma conexión de referencia.</li><li>Abre el interruptor mientras cambia el flujo y distingue las lecturas de fem y corriente.</li><li>En el generador, compara una vuelta completa con las gráficas de flujo y fem. Explica su desfase.</li></ol><p>Formula una predicción, modifica una variable y describe una observación medible. Las gráficas del laboratorio usan escalas independientes: flujo en mWb, fem en V y corriente en mA. Los dibujos son modelos didácticos; sus idealizaciones no reproducen todos los detalles de una bobina real.</p><div class=\"key\"><b>Idea clave</b>Un generador convierte energía. Para sostener la entrega de energía eléctrica se necesita un aporte de energía mecánica.</div><p class=\"resource-note\">Para ampliar: <a href=\"https://openstax.org/books/university-physics-volume-2/pages/13-6-electric-generators-and-back-emf\" target=\"_blank\" rel=\"noopener noreferrer\">Generadores eléctricos · OpenStax</a>.</p>",
      "examples": []
    }
  ],
  "workedExamples": [
    {
      "number": 1,
      "title": "Cortar un imán no separa sus polos",
      "question": "Un imán de barra, con N a la izquierda y S a la derecha, se corta transversalmente por el centro. ¿Qué polos aparecen en las caras nuevas?",
      "steps": [
        "Cada fragmento conserva los dos polos; no obtenemos un norte aislado y un sur aislado.",
        "En el fragmento izquierdo, el extremo original sigue siendo N y la nueva cara derecha es S.",
        "En el fragmento derecho, la nueva cara izquierda es N y el extremo original sigue siendo S.",
        "Respuesta: las caras nuevas enfrentadas son S y N. La división produce dos imanes."
      ]
    },
    {
      "number": 2,
      "title": "Oersted y el sentido del campo",
      "question": "Un hilo perpendicular a la hoja conduce corriente hacia quien observa (⊙). Una sonda está a la derecha del hilo. Considera únicamente el campo del conductor. ¿Hacia dónde apunta B y qué ocurre al invertir la corriente?",
      "steps": [
        "Apunta el pulgar derecho hacia ti: las líneas rodean el hilo en sentido antihorario.",
        "En el punto derecho de una circunferencia antihoraria, la tangente apunta hacia arriba. Ese es el sentido inicial de B.",
        "Al invertir la corriente, las líneas pasan a sentido horario y B en la sonda apunta hacia abajo.",
        "Respuesta: primero hacia arriba; después hacia abajo. La magnitud se conserva si |I| y la distancia no cambian. Una brújula real seguiría el campo total."
      ]
    },
    {
      "number": 3,
      "title": "Campo de un hilo largo",
      "question": "Un hilo rectilíneo muy largo lleva \\(5\\,\\mathrm A\\). Calcula la magnitud del campo a \\(2\\,\\mathrm{cm}\\) de su eje, fuera del conductor y lejos de sus extremos. Usa \\(\\mu_0\\approx4\\pi\\times10^{-7}\\,\\mathrm{T\\cdot m/A}\\).",
      "steps": [
        "Convierte la distancia: \\(r=2\\,\\mathrm{cm}=0{,}02\\,\\mathrm m\\).",
        "El modelo es \\(B=\\mu_0|I|/(2\\pi r)\\).",
        "<div class=\"equation\">\\[B=\\frac{(4\\pi\\times10^{-7})(5)}{2\\pi(0{,}02)}=5\\times10^{-5}\\,\\mathrm T\\]</div>",
        "Respuesta: \\(\\boxed{B=50\\,\\mu\\mathrm T}\\). El sentido se determina con la mano derecha; no se obtiene de la magnitud sola."
      ]
    },
    {
      "number": 4,
      "title": "Superposición entre dos conductores",
      "question": "Dos hilos largos paralelos atraviesan la hoja y están separados \\(10\\,\\mathrm{cm}\\). Ambos llevan \\(5\\,\\mathrm A\\) salientes (⊙). Calcula el campo total en el punto medio. Después determina qué ocurriría si solo se invierte la corriente del hilo derecho.",
      "steps": [
        "El punto medio está a \\(r=5\\,\\mathrm{cm}=0{,}05\\,\\mathrm m\\) de cada hilo.",
        "Cada hilo produce \\(B=2\\times10^{-7}(5)/0{,}05=2\\times10^{-5}\\,\\mathrm T=20\\,\\mu\\mathrm T\\).",
        "Con ambas corrientes salientes, el hilo izquierdo produce campo hacia arriba en el punto medio; el derecho, hacia abajo. Los vectores tienen igual magnitud y sentidos opuestos.",
        "Respuesta inicial: \\(\\boxed{\\vec B_{\\text{total}}=\\vec0}\\). Si solo se invierte el hilo derecho, su campo apunta hacia arriba y se suma al del izquierdo: \\(\\boxed{40\\,\\mu\\mathrm T\\text{ hacia arriba}}\\)."
      ]
    },
    {
      "number": 5,
      "title": "Fuerza sobre una carga positiva",
      "question": "Una carga positiva de \\(3\\,\\mu\\mathrm C\\) se mueve a \\(2\\times10^4\\,\\mathrm{m/s}\\) hacia la derecha de la hoja. El campo uniforme es \\(0{,}40\\,\\mathrm T\\) y entra perpendicularmente en ella (⊗). Halla la magnitud y el sentido de la fuerza.",
      "steps": [
        "Convierte la carga: \\(q=3\\times10^{-6}\\,\\mathrm C\\). Como \\(\\vec v\\perp\\vec B\\), \\(\\operatorname{sen}90^\\circ=1\\).",
        "<div class=\"equation\">\\[F=|q|vB=(3\\times10^{-6})(2\\times10^4)(0{,}40)=0{,}024\\,\\mathrm N\\]</div>",
        "La mano derecha aplicada desde la velocidad hacia la derecha hasta el campo entrante da una fuerza hacia arriba para una carga positiva.",
        "Respuesta: \\(\\boxed{F=0{,}024\\,\\mathrm N\\text{ hacia arriba}}\\). Para una carga negativa con el mismo |q|, la fuerza apuntaría hacia abajo."
      ]
    },
    {
      "number": 6,
      "title": "Fuerza sobre un tramo recto",
      "question": "Un tramo recto de \\(0{,}50\\,\\mathrm m\\) conduce \\(4\\,\\mathrm A\\) y está completamente inmerso en un campo externo uniforme de \\(0{,}30\\,\\mathrm T\\). La corriente forma \\(30^\\circ\\) con el campo. Calcula la magnitud de la fuerza.",
      "steps": [
        "La expresión para el tramo recto es \\(F=BIL\\operatorname{sen}\\theta\\). El ángulo se mide entre corriente y campo.",
        "Sustituye \\(\\operatorname{sen}30^\\circ=0{,}50\\).",
        "<div class=\"equation\">\\[F=(0{,}30)(4)(0{,}50)(0{,}50)=0{,}30\\,\\mathrm N\\]</div>",
        "Respuesta: \\(\\boxed{F=0{,}30\\,\\mathrm N}\\). Para fijar su sentido también hace falta conocer la orientación de ambos vectores."
      ]
    },
    {
      "number": 7,
      "title": "Ángulo de la normal y flujo",
      "question": "Una espira plana de área \\(0{,}030\\,\\mathrm{m^2}\\) está en un campo uniforme de \\(0{,}40\\,\\mathrm T\\). La normal elegida forma \\(60^\\circ\\) con el campo. Calcula el flujo por la espira.",
      "steps": [
        "El ángulo está dado con la normal, así que se utiliza directamente en \\(\\Phi=BA\\cos\\theta\\).",
        "<div class=\"equation\">\\[\\Phi=(0{,}40)(0{,}030)\\cos60^\\circ=0{,}0060\\,\\mathrm{Wb}\\]</div>",
        "Respuesta: \\(\\boxed{\\Phi=+6{,}0\\times10^{-3}\\,\\mathrm{Wb}}\\). Es positivo porque \\(\\cos60^\\circ>0\\).",
        "Si los 60° se hubieran medido con el plano, el ángulo con la normal sería 30° y el resultado sería distinto."
      ]
    },
    {
      "number": 8,
      "title": "Fem media de una bobina",
      "question": "El flujo por espira de una bobina de \\(100\\) vueltas aumenta linealmente de \\(0{,}001\\,\\mathrm{Wb}\\) a \\(0{,}004\\,\\mathrm{Wb}\\) en \\(0{,}15\\,\\mathrm s\\). Calcula la fem media con la referencia de normal y recorrido fijada por la mano derecha.",
      "steps": [
        "El cambio es \\(\\Delta\\Phi=0{,}004-0{,}001=+0{,}003\\,\\mathrm{Wb}\\).",
        "<div class=\"equation\">\\[\\varepsilon_{\\text{media}}=-N\\frac{\\Delta\\Phi}{\\Delta t}=-100\\frac{0{,}003}{0{,}15}=-2{,}0\\,\\mathrm V\\]</div>",
        "Respuesta: \\(\\boxed{\\varepsilon_{\\text{media}}=-2{,}0\\,\\mathrm V}\\); su magnitud es \\(2{,}0\\,\\mathrm V\\).",
        "El signo expresa oposición al aumento del flujo positivo. Como el flujo cambia linealmente, la fem instantánea es constante durante ese intervalo."
      ]
    },
    {
      "number": 9,
      "title": "Lenz: oponerse a un aumento",
      "question": "Un campo externo entra en la hoja (⊗) y su flujo a través de una espira conductora cerrada aumenta. ¿Qué sentido tiene la corriente inducida vista de frente? ¿Qué cambia si la espira se abre, en el modelo ideal del laboratorio?",
      "steps": [
        "El flujo entrante está aumentando. El campo inducido debe salir de la hoja para oponerse a ese aumento.",
        "Apunta el pulgar derecho hacia ti para representar el campo inducido saliente: los dedos rodean la espira en sentido antihorario.",
        "Respuesta: corriente antihoraria mientras la espira está cerrada.",
        "Al abrir la espira, la corriente sostenida pasa a cero en el modelo, aunque puede seguir existiendo fem inducida mientras cambie el flujo externo."
      ]
    },
    {
      "number": 10,
      "title": "Amplitud y frecuencia de un generador",
      "question": "Una bobina de \\(200\\) espiras y área \\(0{,}010\\,\\mathrm{m^2}\\) gira a \\(20\\,\\mathrm{rad/s}\\) en un campo uniforme de \\(0{,}050\\,\\mathrm T\\). Calcula la fem máxima y la frecuencia. Después predice qué ocurre al duplicar solo la rapidez angular.",
      "steps": [
        "<div class=\"equation\">\\[\\varepsilon_0=NBA|\\omega|=(200)(0{,}050)(0{,}010)(20)=2{,}0\\,\\mathrm V\\]</div>",
        "<div class=\"equation\">\\[f=\\frac{|\\omega|}{2\\pi}=\\frac{20}{2\\pi}=\\frac{10}{\\pi}\\,\\mathrm{Hz}\\approx3{,}18\\,\\mathrm{Hz}\\]</div>",
        "Respuesta inicial: \\(\\boxed{\\varepsilon_0=2{,}0\\,\\mathrm V}\\) y \\(\\boxed{f\\approx3{,}18\\,\\mathrm{Hz}}\\).",
        "Al duplicar |ω|, ambas se duplican: \\(\\varepsilon_0=4{,}0\\,\\mathrm V\\) y \\(f\\approx6{,}37\\,\\mathrm{Hz}\\). Mantener el giro bajo carga requiere energía mecánica externa."
      ]
    }
  ]
};
