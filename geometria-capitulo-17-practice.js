'use strict';
window.CHAPTER_PRACTICES=window.CHAPTER_PRACTICES||{};
window.CHAPTER_PRACTICES['geometria-capitulo-17']={
  "title": "Poliedros convexos y regulares",
  "problems": [
    {
      "id": "geo17-p01",
      "level": "Básico",
      "prompt": "¿Cuál de los siguientes sólidos es un poliedro?",
      "options": [
        "Un cubo.",
        "Una esfera.",
        "Un cilindro circular.",
        "Un cono circular.",
        "Un toro de superficie curva."
      ],
      "answer": 0,
      "solution": "<p>El cubo está limitado por seis caras poligonales planas. Los otros sólidos mencionados tienen superficies curvas y no son poliedros.</p>"
    },
    {
      "id": "geo17-p02",
      "level": "Básico",
      "prompt": "¿Qué terna indica, en ese orden, el número de vértices, aristas y caras de un cubo?",
      "options": [
        "(6, 12, 8).",
        "(8, 12, 6).",
        "(8, 6, 12).",
        "(12, 8, 6).",
        "(6, 8, 12)."
      ],
      "answer": 1,
      "solution": "<p>El cubo tiene 8 vértices, 12 aristas y 6 caras. Se comprueba la relación de Euler: 8 − 12 + 6 = 2.</p>"
    },
    {
      "id": "geo17-p03",
      "level": "Básico",
      "prompt": "Un poliedro convexo tiene 10 vértices y 7 caras. ¿Cuántas aristas tiene?",
      "options": [
        "13.",
        "14.",
        "15.",
        "16.",
        "17."
      ],
      "answer": 2,
      "solution": "<p>Aplicamos V − A + C = 2: 10 − A + 7 = 2. Por tanto, A = 10 + 7 − 2 = 15 aristas.</p>"
    },
    {
      "id": "geo17-p04",
      "level": "Básico",
      "prompt": "¿Qué condición describe un poliedro regular convexo?",
      "options": [
        "Sus caras pueden ser polígonos regulares de formas diferentes.",
        "Basta con que todas sus aristas tengan la misma longitud.",
        "Debe tener exactamente seis caras.",
        "Todas sus caras son polígonos regulares congruentes y presentan la misma disposición alrededor de cada vértice.",
        "Es cualquier pirámide cuya base sea un polígono regular."
      ],
      "answer": 3,
      "solution": "<p>La regularidad requiere caras regulares congruentes y la misma disposición en todos los vértices. Una pirámide regular de base cuadrada tiene una base cuadrada y caras triangulares; no es un sólido platónico.</p>"
    },
    {
      "id": "geo17-p05",
      "level": "Intermedio",
      "prompt": "¿Qué sólido platónico tiene veinte caras triangulares equiláteras?",
      "options": [
        "El tetraedro.",
        "El cubo.",
        "El octaedro.",
        "El dodecaedro.",
        "El icosaedro."
      ],
      "answer": 4,
      "solution": "<p>El icosaedro regular tiene 20 caras triangulares, 30 aristas y 12 vértices. El tetraedro tiene 4 caras triangulares y el octaedro tiene 8.</p>"
    },
    {
      "id": "geo17-p06",
      "level": "Intermedio",
      "prompt": "Un desarrollo plano de un cubo está formado por seis cuadrados congruentes de lado 3 cm. ¿Cuál es el área total del cubo?",
      "options": [
        "54 cm².",
        "27 cm².",
        "18 cm².",
        "36 cm².",
        "81 cm²."
      ],
      "answer": 0,
      "solution": "<p>El área de cada cara es 3² = 9 cm². Las seis caras suman 6 × 9 = 54 cm². El plegado conserva el área de las caras.</p>"
    },
    {
      "id": "geo17-p07",
      "level": "Intermedio",
      "prompt": "Una pirámide regular tiene base cuadrada de lado 6 cm y apotema lateral 5 cm. ¿Cuál es su área total?",
      "options": [
        "66 cm².",
        "96 cm².",
        "120 cm².",
        "36 cm².",
        "156 cm²."
      ],
      "answer": 1,
      "solution": "<p>La base tiene área 6² = 36 cm². Cada cara lateral tiene área (6 × 5)/2 = 15 cm² y las cuatro suman 60 cm². El área total es 36 + 60 = 96 cm².</p>"
    },
    {
      "id": "geo17-p08",
      "level": "Intermedio",
      "prompt": "¿Cuál es el mayor número de lados que puede tener una sección plana interior no degenerada de un cubo?",
      "options": [
        "3.",
        "4.",
        "6.",
        "8.",
        "12."
      ],
      "answer": 2,
      "solution": "<p>La sección es un polígono convexo y cada una de las seis caras puede aportar como máximo un lado. El máximo es seis, y se alcanza con un corte diagonal central adecuado.</p>"
    },
    {
      "id": "geo17-p09",
      "level": "Avanzado",
      "prompt": "El plano x + y + z = 0 corta el cubo −1 ≤ x, y, z ≤ 1 y produce un hexágono regular de lado √2. ¿Cuál es el área de esa sección?",
      "options": [
        "√3 u².",
        "2√3 u².",
        "6 u².",
        "3√3 u².",
        "6√3 u²."
      ],
      "answer": 3,
      "solution": "<p>Un hexágono regular se divide en seis triángulos equiláteros. Cada uno tiene área (√3/4)(√2)² = √3/2. El área total es 6 × √3/2 = 3√3 u².</p>"
    },
    {
      "id": "geo17-p10",
      "level": "Avanzado",
      "prompt": "Un poliedro convexo tiene veinte caras triangulares y en cada vértice concurren cinco aristas. ¿Cuántos vértices y aristas tiene, respectivamente?",
      "options": [
        "20 y 30.",
        "30 y 20.",
        "12 y 20.",
        "30 y 12.",
        "12 y 30."
      ],
      "answer": 4,
      "solution": "<p>Los veinte triángulos aportan 20 × 3 = 60 lados contados desde las caras. Cada arista se cuenta dos veces: A = 30. Como cada arista tiene dos extremos y concurren cinco en cada vértice, 5V = 2A = 60, de donde V = 12. Se comprueba: 12 − 30 + 20 = 2.</p>"
    }
  ]
};
