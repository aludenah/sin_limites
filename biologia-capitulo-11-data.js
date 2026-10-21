'use strict';
// Desarrollo didáctico original. Referencias de verificación: OpenStax Biology 2e,
// secciones 40.1–40.4 y 30.5. No se reproducen sus textos ni sus ilustraciones.
window.HISTORY_CONTENT = {
  number: 11,
  id: 'biologia-capitulo-11',
  progressId: 'biologia-capitulo-11',
  courseId: 18,
  courseName: 'Biología',
  title: 'Circulación y transporte',
  intro: 'Explora el corazón, explica el recorrido de la sangre y compara cómo se transportan sustancias en animales y plantas.',
  version: 1,
  format: 'reading',
  assessmentFormat: 'practice-10',
  goals: [
    { title: 'Reconocer estructuras', text: 'Relaciona cavidades, válvulas y vasos del corazón con su función.' },
    { title: 'Explicar el recorrido', text: 'Distingue la circulación pulmonar de la sistémica y sigue el sentido de la sangre.' },
    { title: 'Comparar transportes', text: 'Diferencia los sistemas circulatorios animales y el transporte por xilema y floema.' }
  ],
  sequenceTitle: 'El recorrido que vamos a explicar',
  sequenceNote: 'El circuito es continuo. Las flechas indican dirección, no duración ni distancia.',
  timeline: [
    ['Cuerpo → corazón derecho', 'La sangre que retorna de los tejidos llega por las venas cavas a la aurícula derecha.'],
    ['Corazón derecho → pulmones', 'El ventrículo derecho envía sangre a los capilares pulmonares, donde ocurre el intercambio gaseoso.'],
    ['Pulmones → corazón izquierdo', 'Las venas pulmonares llevan la sangre oxigenada hacia la aurícula izquierda.'],
    ['Corazón izquierdo → cuerpo', 'El ventrículo izquierdo la impulsa por la aorta hacia los tejidos.']
  ],
  lessons: [
    {
      title: 'El corazón en acción',
      blocks: [
        {
          id: 'bio11-corazon-interactivo',
          title: 'Explora el corazón en tres dimensiones',
          paragraphs: [
            'El corazón es una bomba muscular que mantiene la circulación. Sus dos mitades trabajan coordinadamente: la derecha impulsa sangre hacia los pulmones y la izquierda hacia el resto del cuerpo. En un corazón adulto normal, el tabique separa la sangre de ambas mitades.',
            'Explora sus estructuras y sigue el recorrido de una gota de sangre. Derecha e izquierda se refieren al cuerpo de la persona representada; en una vista frontal pueden aparecer invertidas respecto de quien observa.'
          ],
          interactive: 'biology-heart'
        },
        {
          id: 'bio11-cavidades',
          title: 'Cuatro cavidades, dos destinos',
          paragraphs: [
            'Las aurículas reciben sangre; los ventrículos la expulsan. El miocardio es el tejido muscular de la pared cardíaca. La pared del ventrículo izquierdo es más gruesa porque debe generar la presión necesaria para impulsar sangre por el circuito sistémico.'
          ],
          headers: ['Cavidad', 'Recibe sangre de', 'La envía hacia'],
          rows: [
            ['Aurícula derecha', 'Venas cavas y seno coronario', 'Ventrículo derecho'],
            ['Ventrículo derecho', 'Aurícula derecha', 'Tronco y arterias pulmonares'],
            ['Aurícula izquierda', 'Venas pulmonares', 'Ventrículo izquierdo'],
            ['Ventrículo izquierdo', 'Aurícula izquierda', 'Aorta']
          ]
        }
      ],
      examples: []
    },
    {
      title: 'La sangre y la red de vasos',
      blocks: [
        {
          id: 'bio11-sangre',
          title: 'Un medio de transporte vivo',
          paragraphs: [
            'El plasma es la parte líquida de la sangre: transporta agua, nutrientes, sales, hormonas y productos de desecho. Los eritrocitos contienen hemoglobina y transportan la mayor parte del oxígeno. Los leucocitos participan en la defensa y las plaquetas intervienen en la formación del tapón que ayuda a detener una hemorragia.',
            'La sangre conecta órganos de intercambio con tejidos: recoge oxígeno en los pulmones y nutrientes absorbidos en el intestino, los distribuye y retira sustancias que deben procesarse o eliminarse. También contribuye a regular la temperatura corporal.'
          ],
          cards: [
            { title: 'Plasma', text: 'Medio líquido que transporta sustancias disueltas.' },
            { title: 'Eritrocitos', text: 'Transportan oxígeno mediante la hemoglobina.' },
            { title: 'Leucocitos y plaquetas', text: 'Participan en la defensa y la hemostasia, respectivamente.' }
          ]
        },
        {
          id: 'bio11-vasos',
          title: 'Arterias, capilares y venas',
          paragraphs: [
            'Una arteria conduce sangre que sale del corazón; una vena la lleva de regreso. Estos nombres indican dirección, no cantidad de oxígeno. Los capilares forman redes de paredes muy delgadas donde se intercambian sustancias con los tejidos.',
            'Las arterias se ramifican en arteriolas y capilares; estos se reúnen en vénulas y venas. Muchas venas, especialmente en los miembros, tienen válvulas que dificultan el retroceso. La contracción de los músculos también favorece el retorno venoso.'
          ],
          headers: ['Vaso', 'Dirección o función', 'Rasgo destacado'],
          rows: [
            ['Arteria', 'Desde el corazón', 'Pared muscular y elástica'],
            ['Capilar', 'Intercambio con los tejidos', 'Pared muy delgada'],
            ['Vena', 'Hacia el corazón', 'Muchas poseen válvulas']
          ]
        }
      ],
      examples: []
    },
    {
      title: 'El viaje de una gota de sangre',
      blocks: [
        {
          id: 'bio11-circuitos',
          title: 'Dos circuitos conectados',
          paragraphs: [
            'La circulación pulmonar empieza en el ventrículo derecho, pasa por los pulmones y termina en la aurícula izquierda. En los capilares pulmonares, la sangre libera dióxido de carbono y capta oxígeno.',
            'La circulación sistémica empieza en el ventrículo izquierdo, distribuye sangre por los órganos y termina en la aurícula derecha. En los capilares de los tejidos, el oxígeno y otras sustancias se intercambian entre la sangre y el líquido que rodea a las células.'
          ],
          cards: [
            { title: 'Circuito pulmonar', text: 'Ventrículo derecho → pulmones → aurícula izquierda.' },
            { title: 'Circuito sistémico', text: 'Ventrículo izquierdo → tejidos → aurícula derecha.' }
          ]
        },
        {
          id: 'bio11-oxigenacion',
          title: 'La dirección y la oxigenación son ideas distintas',
          paragraphs: [
            'Las arterias pulmonares salen del corazón y llevan sangre con menor contenido de oxígeno hacia los pulmones. Las venas pulmonares regresan al corazón y transportan sangre oxigenada. Esta comparación permite evitar la regla incorrecta «toda arteria lleva sangre oxigenada».',
            'En los esquemas, azul y rojo suelen representar menor y mayor oxigenación. La sangre humana siempre tiene tonalidades rojas: no se vuelve azul. La circulación coronaria, por su parte, abastece al propio músculo cardíaco.'
          ]
        }
      ],
      examples: [
        {
          title: 'Desde el cuerpo hasta la aorta',
          question: 'Sigue una gota que retorna de los tejidos y vuelve a salir hacia ellos.',
          steps: [
            'Venas cavas → aurícula derecha → válvula tricúspide → ventrículo derecho.',
            'Válvula pulmonar → tronco y arterias pulmonares → capilares de los pulmones.',
            'Venas pulmonares → aurícula izquierda → válvula mitral → ventrículo izquierdo.',
            'Válvula aórtica → aorta → arterias y capilares sistémicos; después retorna por las venas.'
          ]
        }
      ]
    },
    {
      title: 'Ciclo cardíaco: llenar e impulsar',
      blocks: [
        {
          id: 'bio11-ciclo',
          title: 'Sístole y diástole',
          paragraphs: [
            'Sístole significa contracción y diástole, relajación. Durante el llenado ventricular, la presión de las aurículas supera a la de los ventrículos y permite el paso de sangre por las válvulas auriculoventriculares. La contracción auricular completa el llenado.',
            'Cuando los ventrículos se contraen y su presión supera la auricular, las válvulas auriculoventriculares se cierran. La eyección comienza cuando la presión ventricular supera la de las arterias de salida y se abren las válvulas semilunares. Al relajarse los ventrículos, estas se cierran e impiden el retroceso desde las arterias.'
          ]
        },
        {
          id: 'bio11-valvulas',
          title: 'Las válvulas orientan el flujo',
          paragraphs: [
            'Las válvulas se abren o se cierran por diferencias de presión. No son bombas: ayudan a mantener el movimiento en un solo sentido. En el ciclo existen breves periodos en los que todas las válvulas están cerradas mientras cambia la presión ventricular.',
            'El impulso que inicia normalmente cada latido se origina en el nodo sinoauricular. El sistema de conducción coordina primero la contracción auricular y después la ventricular.'
          ],
          headers: ['Válvula', 'Ubicación', 'Retroceso que evita al cerrarse'],
          rows: [
            ['Tricúspide', 'Aurícula derecha → ventrículo derecho', 'Hacia la aurícula derecha'],
            ['Mitral o bicúspide', 'Aurícula izquierda → ventrículo izquierdo', 'Hacia la aurícula izquierda'],
            ['Pulmonar', 'Ventrículo derecho → tronco pulmonar', 'Hacia el ventrículo derecho'],
            ['Aórtica', 'Ventrículo izquierdo → aorta', 'Hacia el ventrículo izquierdo']
          ]
        }
      ],
      examples: []
    },
    {
      title: 'El transporte en los animales',
      blocks: [
        {
          id: 'bio11-abierta-cerrada',
          title: 'Sistemas abiertos y cerrados',
          paragraphs: [
            'En animales pequeños o de organización sencilla, la difusión puede cubrir parte importante del transporte. En organismos de mayor tamaño, las distancias entre las células y el exterior favorecen la presencia de sistemas especializados.',
            'En un sistema circulatorio abierto, la hemolinfa sale de los vasos hacia espacios que bañan los órganos. En uno cerrado, la sangre se mantiene dentro de vasos y las sustancias se intercambian a través de sus paredes. Los artrópodos y la mayoría de los moluscos tienen circulación abierta; los anélidos, cefalópodos y vertebrados, cerrada.'
          ],
          cards: [
            { title: 'Abierta', text: 'La hemolinfa circula también por espacios alrededor de los órganos.' },
            { title: 'Cerrada', text: 'La sangre recorre una red continua de vasos.' }
          ]
        },
        {
          id: 'bio11-simple-doble',
          title: 'Circulación simple y doble',
          paragraphs: [
            'En los peces, la sangre pasa una vez por el corazón en cada vuelta completa: corazón → branquias → cuerpo → corazón. Es una circulación simple.',
            'En aves y mamíferos, una vuelta completa incluye dos pasos por el corazón: circuito pulmonar y circuito sistémico. Su corazón de cuatro cavidades mantiene separados ambos flujos; por ello, su circulación es doble y completa.'
          ]
        }
      ],
      examples: []
    },
    {
      title: 'El transporte en las plantas',
      blocks: [
        {
          id: 'bio11-xilema',
          title: 'Xilema: agua y sales minerales',
          paragraphs: [
            'El xilema conduce agua y sales minerales desde las raíces hacia las partes aéreas. Sus elementos conductores maduros son células muertas con paredes reforzadas. La evaporación de agua por las hojas produce una tensión que ayuda a elevar una columna continua de agua.',
            'La cohesión entre moléculas de agua y su adhesión a las paredes contribuyen a mantener esa columna. La transpiración permite comprender por qué el movimiento del agua depende también de las hojas y del ambiente.'
          ]
        },
        {
          id: 'bio11-floema',
          title: 'Floema: de las fuentes a los destinos',
          paragraphs: [
            'El floema transporta azúcares y otras sustancias orgánicas desde una fuente, como una hoja que produce más azúcares de los que utiliza, hacia un destino o sumidero, como una raíz, un fruto o una región en crecimiento.',
            'La dirección depende de la ubicación de la fuente y el destino. Por eso no es correcto afirmar que el floema siempre transporta hacia abajo. Sus elementos conductores son células vivas especializadas y funcionan junto con células acompañantes en las plantas con flores.'
          ],
          headers: ['Tejido', 'Carga principal', 'Recorrido característico'],
          rows: [
            ['Xilema', 'Agua y sales minerales', 'Desde raíces hacia partes aéreas'],
            ['Floema', 'Azúcares y otros compuestos orgánicos', 'Desde fuentes hacia sumideros']
          ]
        }
      ],
      examples: [
        {
          title: 'Una hoja abastece una raíz',
          question: 'Una hoja produce azúcares y una raíz los utiliza para crecer. ¿Qué tejido interviene?',
          steps: [
            'La hoja funciona como fuente de azúcares y la raíz como sumidero.',
            'El transporte de esos compuestos orgánicos corresponde al floema.',
            'El agua y las sales minerales absorbidas por la raíz siguen principalmente el xilema.'
          ]
        }
      ]
    }
  ]
};
