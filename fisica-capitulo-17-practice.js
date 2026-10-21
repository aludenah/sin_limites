'use strict';
window.CHAPTER_PRACTICES=window.CHAPTER_PRACTICES||{};
window.CHAPTER_PRACTICES['fisica-capitulo-17']={
  "title": "Electromagnetismo",
  "problems": [
    {
      "id": "fis17-p01",
      "level": "Básico",
      "prompt": "En el exterior de un imán de barra, ¿cuál es el sentido de sus líneas de campo magnético?",
      "options": [
        "Del polo norte al polo sur.",
        "Del polo sur al polo norte.",
        "Siempre hacia arriba.",
        "Hacia fuera de ambos polos.",
        "No tienen un sentido definido."
      ],
      "answer": 0,
      "solution": "<p>En el exterior las líneas salen del norte y entran en el sur. Continúan por dentro del imán del sur al norte, formando lazos cerrados.</p>"
    },
    {
      "id": "fis17-p02",
      "level": "Básico",
      "prompt": "Un hilo rectilíneo largo lleva corriente convencional hacia quien observa, perpendicular a la hoja (⊙). ¿Cómo se orienta el campo alrededor del hilo visto de frente?",
      "options": [
        "Radialmente hacia fuera.",
        "En sentido antihorario.",
        "En sentido horario.",
        "Paralelo al hilo en todos los puntos.",
        "Radialmente hacia el hilo."
      ],
      "answer": 1,
      "solution": "<p>Apunta el pulgar derecho hacia ti, como la corriente. Los dedos se curvan en sentido antihorario. Las líneas son circunferencias alrededor del conductor.</p>"
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
      "solution": "<p>F = |q|vB sen 90° = (2 × 10⁻⁶)(3 × 10⁴)(0,50) = 3 × 10⁻² N = 0,030 N.</p>"
    },
    {
      "id": "fis17-p04",
      "level": "Básico",
      "prompt": "Una carga positiva se mueve hacia la derecha de la hoja en un campo magnético que entra perpendicularmente en ella (⊗). ¿Hacia dónde apunta la fuerza magnética?",
      "options": [
        "Hacia la derecha.",
        "Hacia la izquierda.",
        "Hacia abajo en la hoja.",
        "Hacia arriba en la hoja.",
        "Hacia dentro de la hoja."
      ],
      "answer": 3,
      "solution": "<p>Para una carga positiva F = q(v × B). La mano derecha desde la velocidad hacia la derecha al campo hacia dentro de la hoja da fuerza hacia arriba.</p>"
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
      "solution": "<p>F = BIL sen θ = (0,50)(2)(0,40)sen 30° = 0,40 × 0,50 = 0,20 N. El ángulo se mide entre la corriente y el campo.</p>"
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
      "solution": "<p>Φ = BA cos θ = (0,30)(0,020)cos 60° = 0,0060 × 0,50 = +0,0030 Wb. El ángulo dado es con la normal.</p>"
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
      "solution": "<p>|ε_media| = N|ΔΦ|/Δt = 50 × (0,005 − 0,001)/0,20 = 1,0 V. El signo requeriría especificar la orientación de referencia.</p>"
    },
    {
      "id": "fis17-p08",
      "level": "Intermedio",
      "prompt": "Una bobina abierta experimenta un cambio de flujo que induce una fem no nula. En el modelo ideal sin capacitancia ni transitorios, ¿qué afirmación es correcta?",
      "options": [
        "No hay fem porque el interruptor está abierto.",
        "La corriente es necesariamente infinita.",
        "Hay fem, pero la corriente sostenida del circuito es cero.",
        "La fem solo puede existir si la bobina tiene una batería.",
        "La corriente es ε/R aunque el circuito esté interrumpido."
      ],
      "answer": 2,
      "solution": "<p>El cambio de flujo induce una fem. Al estar abierto el circuito no existe una trayectoria conductora cerrada y no circula corriente sostenida en este modelo.</p>"
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
      "solution": "<p>Lenz exige oponerse a la disminución del flujo entrante: el campo inducido debe entrar en la hoja. La mano derecha da corriente en sentido horario.</p>"
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
      "solution": "<p>La amplitud es ε₀ = NBA|ω|, por lo que es proporcional al número de espiras. La frecuencia f = |ω|/(2π) depende de la rapidez angular y permanece igual.</p>"
    }
  ]
};
