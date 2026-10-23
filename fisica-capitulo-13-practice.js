'use strict';
window.CHAPTER_PRACTICES=window.CHAPTER_PRACTICES||{};
window.CHAPTER_PRACTICES['fisica-capitulo-13']={
  "title": "Ondas mecánicas",
  "sourceMaterial": "Problemas originales de aplicación para el capítulo de Ondas mecánicas.",
  "problems": [
    {
      "id": "fis13-p01",
      "level": "Básico",
      "topic": "Rapidez de propagación",
      "prompt": "Una onda periódica se propaga por una cuerda con longitud de onda de \\(0{,}80\\,\\mathrm m\\) y frecuencia de \\(5\\,\\mathrm{Hz}\\). ¿Cuál es su rapidez de propagación?",
      "options": [
        "\\(0{,}16\\,\\mathrm{m/s}\\)",
        "\\(1\\,\\mathrm{m/s}\\)",
        "\\(4\\,\\mathrm{m/s}\\)",
        "\\(5{,}8\\,\\mathrm{m/s}\\)",
        "\\(6{,}25\\,\\mathrm{m/s}\\)"
      ],
      "answer": 2,
      "solution": "<ol><li>La perturbación recorre una longitud de onda durante cada período. Por ello, \\(v=\\lambda f\\).</li><li>Los datos están en el SI: \\(\\lambda=0{,}80\\,\\mathrm m\\) y \\(f=5\\,\\mathrm{Hz}\\).</li><li>\\(v=(0{,}80)(5)=4\\,\\mathrm{m/s}\\). <strong>Alternativa C.</strong></li></ol>"
    },
    {
      "id": "fis13-p02",
      "level": "Básico",
      "topic": "Período y frecuencia",
      "prompt": "Un punto de una cuerda completa una oscilación cada \\(0{,}040\\,\\mathrm s\\). Determine la frecuencia de la onda.",
      "options": [
        "\\(0{,}040\\,\\mathrm{Hz}\\)",
        "\\(2{,}5\\,\\mathrm{Hz}\\)",
        "\\(4\\,\\mathrm{Hz}\\)",
        "\\(25\\,\\mathrm{Hz}\\)",
        "\\(40\\,\\mathrm{Hz}\\)"
      ],
      "answer": 3,
      "solution": "<ol><li>El tiempo de una oscilación es el período: \\(T=0{,}040\\,\\mathrm s\\).</li><li>La frecuencia es el número de oscilaciones por segundo: \\(f=1/T\\).</li><li>\\(f=1/0{,}040=25\\,\\mathrm{Hz}\\). <strong>Alternativa D.</strong></li></ol>"
    },
    {
      "id": "fis13-p03",
      "level": "Básico",
      "topic": "Número de oscilaciones",
      "prompt": "Una fuente vibra uniformemente con frecuencia de \\(20\\,\\mathrm{Hz}\\). ¿Cuántas oscilaciones completas realiza durante \\(0{,}75\\,\\mathrm s\\)?",
      "options": [
        "\\(15\\)",
        "\\(20\\)",
        "\\(25\\)",
        "\\(30\\)",
        "\\(40\\)"
      ],
      "answer": 0,
      "solution": "<ol><li>\\(f=20\\,\\mathrm{Hz}\\) significa que la fuente realiza 20 oscilaciones por segundo.</li><li>El número de oscilaciones en un intervalo es \\(N=f\\Delta t\\).</li><li>\\(N=(20)(0{,}75)=15\\) oscilaciones. <strong>Alternativa A.</strong></li></ol>"
    },
    {
      "id": "fis13-p04",
      "level": "Intermedio",
      "topic": "Rapidez de una onda en una cuerda",
      "prompt": "Una cuerda uniforme de \\(4{,}0\\,\\mathrm m\\) tiene masa de \\(80\\,\\mathrm g\\) y está sometida a una tensión de \\(50\\,\\mathrm N\\). En el modelo de cuerda ideal, halle la rapidez de sus ondas transversales.",
      "options": [
        "\\(10\\,\\mathrm{m/s}\\)",
        "\\(20\\,\\mathrm{m/s}\\)",
        "\\(25\\,\\mathrm{m/s}\\)",
        "\\(40\\,\\mathrm{m/s}\\)",
        "\\(50\\,\\mathrm{m/s}\\)"
      ],
      "answer": 4,
      "solution": "<ol><li>Convierte la masa: \\(m=80\\,\\mathrm g=0{,}080\\,\\mathrm{kg}\\).</li><li>La densidad lineal es \\(\\mu=m/L=0{,}080/4{,}0=0{,}020\\,\\mathrm{kg/m}\\).</li><li>Para una cuerda ideal, \\(v=\\sqrt{F_T/\\mu}\\).</li><li>\\(v=\\sqrt{50/0{,}020}=\\sqrt{2500}=50\\,\\mathrm{m/s}\\). <strong>Alternativa E.</strong></li></ol>"
    },
    {
      "id": "fis13-p05",
      "level": "Intermedio",
      "topic": "Lectura de la ecuación de una onda",
      "prompt": "Una onda está descrita por \\(y=0{,}030\\operatorname{sen}(4\\pi x-20\\pi t)\\), donde \\(x\\) e \\(y\\) se expresan en metros, \\(t\\) en segundos y el argumento del seno en radianes. Indique su longitud de onda, rapidez y sentido de propagación, en ese orden.",
      "options": [
        "\\(0{,}50\\,\\mathrm m\\); \\(5\\,\\mathrm{m/s}\\); hacia \\(-x\\)",
        "\\(0{,}50\\,\\mathrm m\\); \\(5\\,\\mathrm{m/s}\\); hacia \\(+x\\)",
        "\\(2{,}0\\,\\mathrm m\\); \\(5\\,\\mathrm{m/s}\\); hacia \\(+x\\)",
        "\\(0{,}50\\,\\mathrm m\\); \\(10\\,\\mathrm{m/s}\\); hacia \\(+x\\)",
        "\\(0{,}25\\,\\mathrm m\\); \\(2{,}5\\,\\mathrm{m/s}\\); hacia \\(+x\\)"
      ],
      "answer": 1,
      "solution": "<ol><li>Compara con \\(y=A\\operatorname{sen}(kx-\\omega t)\\): \\(k=4\\pi\\,\\mathrm{rad/m}\\) y \\(\\omega=20\\pi\\,\\mathrm{rad/s}\\).</li><li>\\(\\lambda=2\\pi/k=2\\pi/(4\\pi)=0{,}50\\,\\mathrm m\\).</li><li>\\(f=\\omega/(2\\pi)=10\\,\\mathrm{Hz}\\) y \\(v=\\lambda f=(0{,}50)(10)=5\\,\\mathrm{m/s}\\).</li><li>Una fase constante cumple \\(kx-\\omega t=\\text{constante}\\); al aumentar el tiempo, \\(x\\) aumenta. La onda viaja hacia \\(+x\\). <strong>Alternativa B.</strong></li></ol>"
    },
    {
      "id": "fis13-p06",
      "level": "Intermedio",
      "topic": "Reflexión de un pulso",
      "prompt": "Un pulso transversal cuya cresta está por encima de la posición de equilibrio se propaga por una cuerda horizontal y llega a su extremo. Compare dos situaciones ideales: extremo fijo y extremo libre. ¿Qué afirmación describe correctamente el pulso reflejado?",
      "options": [
        "Se invierte en ambos tipos de extremo.",
        "No se invierte en ninguno de los dos tipos de extremo.",
        "No se invierte en el extremo fijo y se invierte en el libre.",
        "Se invierte en el extremo fijo y no se invierte en el libre.",
        "En el extremo fijo no existe pulso reflejado; en el libre sí."
      ],
      "answer": 3,
      "solution": "<ol><li>En un extremo fijo, el punto de sujeción no puede desplazarse. La suma de los desplazamientos incidente y reflejado debe ser cero allí.</li><li>Por ello, el pulso reflejado tiene signo opuesto: la cresta incidente se convierte en una depresión que regresa por la cuerda.</li><li>En el extremo libre ideal, el pulso se refleja sin inversión: la cresta se conserva por encima del equilibrio.</li><li>La afirmación correcta combina inversión en el fijo y ausencia de inversión en el libre. <strong>Alternativa D.</strong></li></ol>"
    },
    {
      "id": "fis13-p07",
      "level": "Intermedio",
      "topic": "Interferencia y diferencia de fase",
      "prompt": "Dos ondas armónicas que viajan en el mismo sentido por una cuerda tienen igual frecuencia y longitud de onda. Sus amplitudes son \\(3\\,\\mathrm{cm}\\) y \\(4\\,\\mathrm{cm}\\), y su diferencia de fase es \\(\\pi/2\\,\\mathrm{rad}\\). Determine la amplitud de la onda resultante.",
      "options": [
        "\\(5\\,\\mathrm{cm}\\)",
        "\\(1\\,\\mathrm{cm}\\)",
        "\\(7\\,\\mathrm{cm}\\)",
        "\\(\\sqrt{7}\\,\\mathrm{cm}\\)",
        "\\(25\\,\\mathrm{cm}\\)"
      ],
      "answer": 0,
      "solution": "<ol><li>Para ondas de igual frecuencia, la amplitud resultante satisface \\(A_R^2=A_1^2+A_2^2+2A_1A_2\\cos\\Delta\\varphi\\).</li><li>La diferencia de fase es \\(\\Delta\\varphi=\\pi/2\\), de modo que \\(\\cos\\Delta\\varphi=0\\).</li><li>\\(A_R=\\sqrt{3^2+4^2}=\\sqrt{25}=5\\,\\mathrm{cm}\\). No se suman directamente las amplitudes porque las ondas no están en fase. <strong>Alternativa A.</strong></li></ol>"
    },
    {
      "id": "fis13-p08",
      "level": "Intermedio",
      "topic": "Ondas estacionarias y armónicos",
      "prompt": "Una cuerda de \\(1{,}50\\,\\mathrm m\\) está fija en ambos extremos. Si la rapidez de las ondas es \\(60\\,\\mathrm{m/s}\\), ¿cuál es la frecuencia de su tercer armónico?",
      "options": [
        "\\(20\\,\\mathrm{Hz}\\)",
        "\\(40\\,\\mathrm{Hz}\\)",
        "\\(60\\,\\mathrm{Hz}\\)",
        "\\(80\\,\\mathrm{Hz}\\)",
        "\\(120\\,\\mathrm{Hz}\\)"
      ],
      "answer": 2,
      "solution": "<ol><li>Con ambos extremos fijos, el armónico \\(n\\) contiene \\(n\\) semilongitudes de onda: \\(L=n\\lambda_n/2\\).</li><li>Para \\(n=3\\), \\(\\lambda_3=2L/3=2(1{,}50)/3=1{,}0\\,\\mathrm m\\).</li><li>\\(f_3=v/\\lambda_3=60/1{,}0=60\\,\\mathrm{Hz}\\). También se obtiene de \\(f_n=nv/(2L)\\). <strong>Alternativa C.</strong></li></ol>"
    },
    {
      "id": "fis13-p09",
      "level": "Avanzado",
      "topic": "Intensidad y nivel sonoro",
      "prompt": "Una fuente sonora puntual emite uniformemente en todas las direcciones con potencia de \\(0{,}040\\pi\\,\\mathrm W\\). Despreciando la absorción y las reflexiones, determine el nivel de intensidad sonora a \\(10\\,\\mathrm m\\) de la fuente. Use \\(I_0=10^{-12}\\,\\mathrm{W/m^2}\\).",
      "options": [
        "\\(20\\,\\mathrm{dB}\\)",
        "\\(40\\,\\mathrm{dB}\\)",
        "\\(60\\,\\mathrm{dB}\\)",
        "\\(100\\,\\mathrm{dB}\\)",
        "\\(80\\,\\mathrm{dB}\\)"
      ],
      "answer": 4,
      "solution": "<ol><li>La potencia se distribuye sobre una superficie esférica de área \\(4\\pi r^2\\).</li><li>\\(I=P/(4\\pi r^2)=0{,}040\\pi/[4\\pi(10)^2]=10^{-4}\\,\\mathrm{W/m^2}\\).</li><li>El nivel de intensidad es \\(\\beta=10\\log_{10}(I/I_0)\\).</li><li>\\(\\beta=10\\log_{10}(10^{-4}/10^{-12})=10\\log_{10}(10^8)=80\\,\\mathrm{dB}\\). <strong>Alternativa E.</strong></li></ol>"
    },
    {
      "id": "fis13-p10",
      "level": "Avanzado",
      "topic": "Efecto Doppler",
      "prompt": "Una fuente emite sonido de frecuencia \\(900\\,\\mathrm{Hz}\\) mientras se acerca en línea recta, con rapidez de \\(34\\,\\mathrm{m/s}\\), a un observador en reposo respecto del aire. Si el sonido se propaga a \\(340\\,\\mathrm{m/s}\\) y no hay viento, ¿qué frecuencia percibe el observador antes de que la fuente lo alcance?",
      "options": [
        "\\(810\\,\\mathrm{Hz}\\)",
        "\\(1000\\,\\mathrm{Hz}\\)",
        "\\(900\\,\\mathrm{Hz}\\)",
        "\\(990\\,\\mathrm{Hz}\\)",
        "\\(1100\\,\\mathrm{Hz}\\)"
      ],
      "answer": 1,
      "solution": "<ol><li>El observador está en reposo en el medio; la fuente se acerca a él. Los frentes de onda llegan más próximos entre sí.</li><li>Para esta situación, \\(f_{\\mathrm{obs}}=f\\,v/(v-v_s)\\), donde \\(v_s\\) es la rapidez de acercamiento de la fuente.</li><li>\\(f_{\\mathrm{obs}}=900\\,(340)/(340-34)=900\\,(340)/306=1000\\,\\mathrm{Hz}\\).</li><li>El resultado es mayor que la frecuencia emitida, como corresponde al acercamiento. <strong>Alternativa B.</strong></li></ol>"
    }
  ]
};
