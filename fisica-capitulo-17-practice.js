'use strict';
window.CHAPTER_PRACTICES=window.CHAPTER_PRACTICES||{};
window.CHAPTER_PRACTICES['fisica-capitulo-17']={
  "title": "Electromagnetismo",
  "problems": [
    {
      "id": "fis17-v2-p01",
      "level": "Básico",
      "topic": "Magnetismo e imanes",
      "prompt": "Un imán permanente de barra, inicialmente con polos norte y sur, se corta transversalmente en dos trozos. Si ambos conservan su imantación, ¿qué se obtiene?",
      "options": [
        "Dos imanes más pequeños, cada uno con polo norte y polo sur.",
        "Un trozo solo con polo norte y otro solo con polo sur.",
        "Dos trozos que únicamente tienen polo norte.",
        "Dos trozos que únicamente tienen polo sur.",
        "Dos cargas eléctricas aisladas, una positiva y otra negativa."
      ],
      "answer": 0,
      "solution": "<ol><li>Un imán de barra tiene dos polos magnéticos: norte y sur.</li><li>El corte no separa polos aislados. Cada fragmento que conserva su imantación presenta ambos polos.</li><li>Por tanto, se forman <strong>dos imanes más pequeños, cada uno con norte y sur</strong>. Sus líneas de campo siguen formando lazos cerrados.</li></ol>"
    },
    {
      "id": "fis17-v2-p02",
      "level": "Básico",
      "topic": "Oersted y regla de la mano derecha",
      "prompt": "En una representación ideal del experimento de Oersted, se considera únicamente el campo producido por un hilo perpendicular a la hoja. Al principio la corriente sale de la hoja (⊙). Se invierte la corriente para que entre (⊗). En un punto P situado a la derecha del hilo, ¿hacia dónde apunta ahora el campo magnético del hilo?",
      "options": [
        "Hacia arriba en la hoja.",
        "Hacia abajo en la hoja.",
        "Hacia la derecha de la hoja.",
        "Hacia fuera de la hoja.",
        "El campo desaparece porque se invierte la corriente."
      ],
      "answer": 1,
      "solution": "<ol><li>Una corriente en un hilo produce un campo magnético circular; la desviación de una brújula es la observación central del experimento de Oersted.</li><li>Al invertir la corriente también se invierte el sentido del campo del hilo.</li><li>Con el pulgar derecho hacia dentro de la hoja (⊗), los dedos rodean el conductor en <strong>sentido horario</strong>.</li><li>En P, situado a la derecha, la tangente a esa circunferencia apunta <strong>hacia abajo</strong>. En una brújula real interviene además el campo terrestre; aquí se considera solo el del hilo.</li></ol>"
    },
    {
      "id": "fis17-v2-p03",
      "level": "Básico",
      "topic": "Biot-Savart: conductor rectilíneo",
      "prompt": "Un hilo rectilíneo muy largo lleva 12 A. Un punto exterior está a 3,0 cm del eje, lejos de los extremos y aproximadamente en el vacío. Usa μ₀ ≈ 4π × 10⁻⁷ T·m/A. ¿Cuál es la magnitud del campo magnético?",
      "options": [
        "8,0 μT.",
        "40 μT.",
        "80 μT.",
        "800 μT.",
        "0,80 μT."
      ],
      "answer": 2,
      "solution": "<ol><li>Convierte la distancia al SI: r = 3,0 cm = 0,030 m.</li><li>Para un hilo muy largo, exterior y lejos de los extremos, B = μ₀|I|/(2πr).</li><li>B = (4π × 10⁻⁷ × 12)/(2π × 0,030) = 8,0 × 10⁻⁵ T.</li><li>Como 1 μT = 10⁻⁶ T, resulta <strong>B = 80 μT</strong>. El sentido se determina por separado con la mano derecha.</li></ol>"
    },
    {
      "id": "fis17-v2-p04",
      "level": "Intermedio",
      "topic": "Superposición de campos",
      "prompt": "Dos hilos rectilíneos muy largos y paralelos atraviesan perpendicularmente la hoja. El hilo izquierdo lleva 6,0 A y el derecho 2,0 A; ambas corrientes salen hacia el observador (⊙). Están separados 8,0 cm. En el punto medio, exterior a ambos hilos, ¿cuál es el campo resultante? Usa μ₀ ≈ 4π × 10⁻⁷ T·m/A.",
      "options": [
        "40 μT hacia arriba en la hoja.",
        "20 μT hacia abajo en la hoja.",
        "0 μT.",
        "20 μT hacia arriba en la hoja.",
        "40 μT hacia abajo en la hoja."
      ],
      "answer": 3,
      "solution": "<ol><li>El punto medio está a r = 8,0/2 = 4,0 cm = 0,040 m de cada eje.</li><li>Cada corriente saliente produce un campo antihorario. En el punto medio, el campo del hilo izquierdo apunta hacia arriba y el del derecho hacia abajo.</li><li>B₁ = (2 × 10⁻⁷)(6,0)/(0,040) = 30 μT; B₂ = (2 × 10⁻⁷)(2,0)/(0,040) = 10 μT.</li><li>Los campos son opuestos: B = 30 − 10 = <strong>20 μT hacia arriba</strong>, en el sentido del campo del hilo con mayor corriente.</li></ol>"
    },
    {
      "id": "fis17-p03",
      "level": "Básico",
      "prompt": "Una carga positiva de 2 μC se mueve a 3 × 10⁴ m/s perpendicularmente a un campo uniforme de 0,50 T. ¿Cuál es la magnitud de la fuerza magnética?",
      "options": [
        "0,003 N.",
        "0,30 N.",
        "0,030 N.",
        "3,0 N.",
        "30 N."
      ],
      "answer": 2,
      "solution": "<ol><li>La magnitud es F = |q|vB sen θ. Aquí θ = 90°, por lo que sen θ = 1.</li><li>Convierte la carga: 2 μC = 2 × 10⁻⁶ C.</li><li>F = (2 × 10⁻⁶)(3 × 10⁴)(0,50) = 3 × 10⁻² N = <strong>0,030 N</strong>.</li><li>La fórmula da la magnitud. Para determinar la dirección se necesita conocer cómo se orientan la velocidad y el campo en el espacio.</li></ol>",
      "topic": "Fuerza sobre una carga"
    },
    {
      "id": "fis17-p05",
      "level": "Intermedio",
      "prompt": "Un tramo recto de 0,40 m lleva 2 A y forma 30° con un campo uniforme de 0,50 T. ¿Cuál es la magnitud de la fuerza sobre el tramo?",
      "options": [
        "0,40 N.",
        "0,80 N.",
        "0,10 N.",
        "0,05 N.",
        "0,20 N."
      ],
      "answer": 4,
      "solution": "<ol><li>El ángulo de 30° se mide entre la corriente convencional y el campo magnético.</li><li>Aplica F = BIL sen θ con L = 0,40 m.</li><li>F = (0,50)(2)(0,40)sen 30° = 0,40 × 0,50 = <strong>0,20 N</strong>.</li></ol>",
      "topic": "Fuerza sobre un conductor"
    },
    {
      "id": "fis17-p06",
      "level": "Intermedio",
      "prompt": "Una espira plana de área 0,020 m² está en un campo uniforme de 0,30 T. La normal elegida forma 60° con el campo. ¿Cuál es el flujo magnético?",
      "options": [
        "0,0030 Wb.",
        "0,0060 Wb.",
        "0,012 Wb.",
        "0 Wb.",
        "−0,0030 Wb."
      ],
      "answer": 0,
      "solution": "<ol><li>El flujo es Φ = BA cos θ y el ángulo se mide con la normal elegida, no con el plano de la espira.</li><li>Φ = (0,30)(0,020)cos 60° = 0,0060 × 0,50.</li><li>El resultado es <strong>+0,0030 Wb</strong>. Es positivo porque la normal elegida forma un ángulo menor de 90° con el campo.</li></ol>",
      "topic": "Flujo magnético"
    },
    {
      "id": "fis17-p07",
      "level": "Intermedio",
      "prompt": "En una bobina de 50 espiras el flujo por espira aumenta uniformemente de 0,001 Wb a 0,005 Wb en 0,20 s. ¿Cuál es la magnitud de la fem media inducida?",
      "options": [
        "0,020 V.",
        "1,0 V.",
        "0,25 V.",
        "2,0 V.",
        "10 V."
      ],
      "answer": 1,
      "solution": "<ol><li>Calcula el cambio de flujo por espira: ΔΦ = 0,005 − 0,001 = 0,004 Wb.</li><li>Faraday da la magnitud media: |ε_media| = N|ΔΦ|/Δt.</li><li>|ε_media| = 50 × 0,004/0,20 = <strong>1,0 V</strong>.</li><li>El signo requiere fijar la normal y el sentido positivo del contorno. La pregunta solicita solo la magnitud.</li></ol>",
      "topic": "Ley de Faraday"
    },
    {
      "id": "fis17-p09",
      "level": "Avanzado",
      "prompt": "El flujo magnético externo que entra en la hoja a través de una espira conductora cerrada está disminuyendo. Vista de frente, ¿qué sentido tiene la corriente inducida?",
      "options": [
        "Antihorario, para producir campo saliente.",
        "Antihorario, para producir campo entrante.",
        "Horario, para producir campo saliente.",
        "Horario, para producir campo entrante.",
        "Es nula porque el flujo disminuye."
      ],
      "answer": 3,
      "solution": "<ol><li>El flujo externo entrante está disminuyendo. Según Lenz, la respuesta inducida se opone a esa disminución.</li><li>Por ello, el campo de la corriente inducida debe <strong>entrar en la hoja</strong>.</li><li>Con la mano derecha, un campo entrante corresponde a una corriente en <strong>sentido horario</strong>, vista de frente.</li><li>La espira está cerrada, de modo que la fem inducida puede producir una corriente.</li></ol>",
      "topic": "Ley de Lenz"
    },
    {
      "id": "fis17-p10",
      "level": "Avanzado",
      "prompt": "Un generador ideal gira a rapidez angular constante en un campo uniforme. Si se duplica únicamente el número de espiras, conservando área y rapidez angular, ¿qué ocurre con la amplitud de la fem y su frecuencia?",
      "options": [
        "Ambas se duplican.",
        "Ambas permanecen iguales.",
        "La amplitud se reduce a la mitad y la frecuencia no cambia.",
        "La amplitud no cambia y la frecuencia se duplica.",
        "La amplitud se duplica y la frecuencia no cambia."
      ],
      "answer": 4,
      "solution": "<ol><li>La amplitud de la fem es ε₀ = NBA|ω|.</li><li>Si únicamente N se duplica, manteniendo B, A y |ω|, la amplitud se duplica.</li><li>La frecuencia es f = |ω|/(2π). Como la rapidez angular no cambia, la frecuencia permanece igual.</li><li>Resultado: <strong>doble amplitud y la misma frecuencia</strong>.</li></ol>",
      "topic": "Generador eléctrico"
    }
  ],
  "revision": "20261021-magnetismo-v2"
};
