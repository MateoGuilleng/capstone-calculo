'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { FaInfinity, FaSquareRootAlt, FaDivide, FaEquals, FaPlus, FaMinus } from 'react-icons/fa';

// Organizamos las preguntas por categorías
const preguntasPorCategoria = {
  derivadas: [
    { pregunta: "¿Qué representa la derivada de una función?", opciones: ["La pendiente de la tangente", "El área bajo la curva", "El valor máximo de la función", "El punto medio del dominio"], respuesta: 0, explicacion: "La derivada representa la pendiente de la recta tangente a la función en un punto dado." },
    { pregunta: "¿Cuál es la derivada de f(x) = 4x^3 - 2x^2 + x - 7?", opciones: ["12x^2 - 4x + 1", "12x - 4x + 1", "4x^2 - 2x + 1", "12x^3 - 4x^2 + x"], respuesta: 0, explicacion: "Aplicando las reglas de derivación: la derivada de x^n es n*x^(n-1)." },
    { pregunta: "¿Cuál es la interpretación física de la derivada en física?", opciones: ["Energía", "Velocidad instantánea", "Distancia total", "Tiempo promedio"], respuesta: 1, explicacion: "En física, la derivada de la posición respecto al tiempo representa la velocidad instantánea." },
    { pregunta: "Si f(x) = √x, entonces f'(x) =", opciones: ["1/(2√x)", "2/√x", "√x", "x^(-1/2)"], respuesta: 0, explicacion: "La derivada de √x es 1/(2√x), que también puede escribirse como (1/2)x^(-1/2)." },
    { pregunta: "¿Qué significa que la derivada de una función sea negativa en un intervalo?", opciones: ["Que la función es creciente", "Que la función es constante", "Que la función es decreciente", "Que la función tiene un mínimo"], respuesta: 2, explicacion: "Cuando la derivada es negativa, la función está decreciendo en ese intervalo." },
    { pregunta: "La derivada de una constante es:", opciones: ["1", "0", "La misma constante", "No existe"], respuesta: 1, explicacion: "La derivada de cualquier constante es cero porque no hay cambio en la función." },
    { pregunta: "¿Quién fue uno de los creadores del concepto de derivada?", opciones: ["Isaac Newton", "Albert Einstein", "Leonhard Euler", "Carl Gauss"], respuesta: 0, explicacion: "Isaac Newton y Gottfried Leibniz desarrollaron de forma independiente el cálculo diferencial." },
    { pregunta: "¿Para qué sirve la derivada en la vida real?", opciones: ["Para analizar cambios y tasas de variación", "Para sumar números grandes", "Para resolver ecuaciones lineales", "Para medir áreas"], respuesta: 0, explicacion: "La derivada permite analizar cómo cambian las cantidades, por ejemplo, la velocidad, el crecimiento poblacional, etc." },
    { pregunta: "¿Cuál es la notación de Leibniz para la derivada?", opciones: ["df/dx", "f'(x)", "Δy/Δx", "∫f(x)dx"], respuesta: 0, explicacion: "La notación de Leibniz es df/dx." },
    { pregunta: "¿Qué significa que una función sea derivable?", opciones: ["Que tiene derivada en todos los puntos de su dominio", "Que es continua", "Que es creciente", "Que es periódica"], respuesta: 0, explicacion: "Una función derivable tiene derivada en todos los puntos de su dominio." },
    { pregunta: "¿Qué relación hay entre derivada y continuidad?", opciones: ["Si es derivable, es continua", "Si es continua, es derivable", "No hay relación", "Si es discontinua, es derivable"], respuesta: 0, explicacion: "Toda función derivable es continua, pero no toda función continua es derivable." },
  ],
  analisis: [
    { pregunta: "Si f'(x) = 0, entonces x es:", opciones: ["Un punto de inflexión", "Un punto crítico", "Un mínimo absoluto", "Un máximo absoluto"], respuesta: 1, explicacion: "Un punto crítico ocurre donde f'(x) = 0 o donde la derivada no existe." },
    { pregunta: "Si f''(x) > 0, entonces la función es:", opciones: ["Cóncava hacia abajo", "Convexa", "Cóncava hacia arriba", "Decreciente"], respuesta: 2, explicacion: "Cuando la segunda derivada es positiva, la función es cóncava hacia arriba (convexa)." },
    { pregunta: "¿Qué indica un cambio de signo en la segunda derivada?", opciones: ["Un punto máximo", "Un punto de inflexión", "Un punto crítico", "Un mínimo global"], respuesta: 1, explicacion: "Un cambio en la concavidad (signo de f''(x)) indica un punto de inflexión." },
    { pregunta: "Si f(x) = x^3, ¿dónde hay un punto de inflexión?", opciones: ["En x = 1", "En x = -1", "En x = 0", "No hay punto de inflexión"], respuesta: 2, explicacion: "Para f(x) = x^3, f''(x) = 6x que cambia de signo en x = 0." },
    { pregunta: "¿Cuándo una función tiene un máximo relativo?", opciones: ["Cuando cambia de creciente a decreciente", "Cuando su derivada segunda es negativa", "Cuando es discontinua", "Cuando no está definida"], respuesta: 0, explicacion: "Un máximo relativo ocurre cuando la función pasa de crecer a decrecer." },
    { pregunta: "¿Qué es un punto crítico?", opciones: ["Donde la derivada es cero o no existe", "Donde la función es máxima", "Donde la función es discontinua", "Donde la función es lineal"], respuesta: 0, explicacion: "Un punto crítico es donde la derivada es cero o no existe." },
    { pregunta: "¿Qué es la concavidad de una función?", opciones: ["La forma en que se curva la gráfica", "El valor máximo", "El valor mínimo", "El área bajo la curva"], respuesta: 0, explicacion: "La concavidad indica si la gráfica se curva hacia arriba o hacia abajo." },
    { pregunta: "¿Para qué se usa el análisis de la segunda derivada?", opciones: ["Para determinar concavidad y puntos de inflexión", "Para calcular áreas", "Para resolver ecuaciones", "Para sumar funciones"], respuesta: 0, explicacion: "La segunda derivada ayuda a determinar la concavidad y los puntos de inflexión de una función." },
    { pregunta: "¿Qué es un máximo relativo?", opciones: ["Un punto más alto que sus vecinos inmediatos", "El valor más alto absoluto", "Un punto donde la derivada es positiva", "Un punto donde la función es discontinua"], respuesta: 0, explicacion: "Un máximo relativo es un punto más alto que los puntos cercanos, pero no necesariamente el más alto de toda la función." },
    { pregunta: "¿Qué es un punto de inflexión?", opciones: ["Donde la concavidad cambia", "Donde la función es máxima", "Donde la derivada es cero", "Donde la función es lineal"], respuesta: 0, explicacion: "Un punto de inflexión es donde la concavidad de la función cambia." },
  ],
  limites: [
    { pregunta: "lim(x->0) (sin x)/x =", opciones: ["1", "0", "infinito", "No existe"], respuesta: 0, explicacion: "Este es un límite notable cuyo resultado es 1." },
    { pregunta: "lim(x->infinito) 1/x =", opciones: ["1", "0", "infinito", "No existe"], respuesta: 1, explicacion: "Cuando x tiende a infinito, 1/x tiende a 0." },
    { pregunta: "Si el límite lateral izquierdo y derecho no coinciden:", opciones: ["El límite no existe", "El límite existe", "La función es continua", "La función tiene derivada"], respuesta: 0, explicacion: "Para que exista el límite, ambos límites laterales deben coincidir." },
    { pregunta: "lim(x->2) (x^2 - 4)/(x - 2) =", opciones: ["2", "4", "No existe", "0"], respuesta: 1, explicacion: "Se puede factorizar como (x-2)(x+2)/(x-2) = x+2, cuyo valor en x=2 es 4." },
    { pregunta: "Si lim(x->a) f(x) = L, ¿es necesario que f(a) = L?", opciones: ["Sí", "No", "Solo si f es derivable", "Solo si f es decreciente"], respuesta: 1, explicacion: "El límite depende de los valores cerca de 'a', no necesariamente del valor en 'a'." },
    { pregunta: "¿Qué es un límite en cálculo?", opciones: ["El valor al que se acerca una función", "El valor máximo de una función", "El área bajo la curva", "El punto de intersección"], respuesta: 0, explicacion: "El límite es el valor al que se acerca una función cuando la variable independiente se aproxima a un punto." },
    { pregunta: "¿Para qué se usan los límites?", opciones: ["Para definir continuidad y derivadas", "Para sumar números", "Para resolver ecuaciones lineales", "Para medir ángulos"], respuesta: 0, explicacion: "Los límites son fundamentales para definir continuidad, derivadas e integrales." },
    { pregunta: "¿Qué significa que un límite no exista?", opciones: ["Que la función no se acerca a un solo valor", "Que la función es discontinua", "Que la función es derivable", "Que la función es constante"], respuesta: 0, explicacion: "Un límite no existe si la función no se aproxima a un solo valor desde ambos lados." },
    { pregunta: "¿Qué es un límite lateral?", opciones: ["El valor al que se acerca la función por un solo lado", "El valor máximo", "El área bajo la curva", "El valor mínimo"], respuesta: 0, explicacion: "Un límite lateral es el valor al que se acerca la función por la izquierda o la derecha de un punto." },
    { pregunta: "¿Qué relación hay entre límite y continuidad?", opciones: ["Una función es continua si el límite existe y coincide con el valor en el punto", "No hay relación", "Si hay límite, no hay continuidad", "Si hay continuidad, no hay límite"], respuesta: 0, explicacion: "Una función es continua en un punto si el límite existe y coincide con el valor de la función en ese punto." },
  ],
  desigualdades: [
    { pregunta: "Resolver: x + 3 < 7", opciones: ["x < 10", "x < 4", "x > 4", "x < 3"], respuesta: 1, explicacion: "Restando 3 a ambos lados: x < 4." },
    { pregunta: "Resolver: 2x - 1 >= 5", opciones: ["x >= 3", "x >= 2", "x <= 3", "x > 2"], respuesta: 0, explicacion: "Sumando 1 y dividiendo por 2: x >= 3." },
    { pregunta: "La desigualdad cuadrática x^2 - 1 < 0 se cumple cuando:", opciones: ["x < -1", "-1 < x < 1", "x > 1", "x < 1"], respuesta: 1, explicacion: "La parábola x^2-1 es negativa entre sus raíces (-1 y 1)." },
    { pregunta: "¿Qué representa gráficamente una desigualdad lineal en dos variables?", opciones: ["Un punto", "Una línea", "Una región en el plano", "Un sistema sin solución"], respuesta: 2, explicacion: "Una desigualdad lineal en dos variables define una región (semiplano) en el plano cartesiano." },
    { pregunta: "Resolver: |x - 2| < 5", opciones: ["x < 7", "-3 < x < 7", "x > 7", "x < -3"], respuesta: 1, explicacion: "La desigualdad |a| < b equivale a -b < a < b, por lo tanto -3 < x < 7." },
    { pregunta: "¿Qué es una desigualdad?", opciones: ["Una relación de orden entre dos expresiones", "Una ecuación", "Una función", "Un número primo"], respuesta: 0, explicacion: "Una desigualdad compara dos expresiones y establece una relación de mayor, menor, etc." },
    { pregunta: "¿Qué es una desigualdad estricta?", opciones: ["Una desigualdad donde no se permite la igualdad", "Una ecuación", "Una función", "Una igualdad"], respuesta: 0, explicacion: "Una desigualdad estricta es aquella donde no se permite el igual (por ejemplo, < o >)." },
    { pregunta: "¿Para qué se usan las desigualdades en la vida real?", opciones: ["Para comparar cantidades, establecer rangos y restricciones", "Para sumar números", "Para medir áreas", "Para resolver ecuaciones cuadráticas"], respuesta: 0, explicacion: "Las desigualdades se usan para comparar cantidades y establecer límites o restricciones en problemas reales." },
    { pregunta: "¿Qué es el conjunto solución de una desigualdad?", opciones: ["El conjunto de valores que la satisfacen", "El valor máximo", "El área bajo la curva", "El valor mínimo"], respuesta: 0, explicacion: "El conjunto solución es el conjunto de valores que hacen verdadera la desigualdad." },
    { pregunta: "¿Qué significa graficar una desigualdad?", opciones: ["Representar en el plano los valores que la cumplen", "Dibujar una recta", "Sumar funciones", "Resolver ecuaciones"], respuesta: 0, explicacion: "Graficar una desigualdad es representar en el plano todos los valores que la cumplen." },
  ],
  tvi: [
    { pregunta: "El Teorema del Valor Intermedio solo aplica si la función es:", opciones: ["Derivable", "Discontinua", "Continua", "Constante"], respuesta: 2, explicacion: "El TVI requiere continuidad en el intervalo cerrado." },
    { pregunta: "Si f(a) < 0 y f(b) > 0, entonces existe c in (a,b) tal que:", opciones: ["f(c) > 0", "f(c) = 0", "f(c) < 0", "f(c) != 0"], respuesta: 1, explicacion: "Por el TVI, una función continua debe pasar por todos los valores intermedios, incluido el 0." },
    { pregunta: "El TVI garantiza la existencia de un valor c tal que:", opciones: ["f(c) = f(a) + f(b)", "f(c) = (f(a)+f(b))/2", "f(c) = L, para algún valor entre f(a) y f(b)", "f(c) = 0, siempre"], respuesta: 2, explicacion: "El TVI asegura que toma todos los valores intermedios entre f(a) y f(b)." },
    { pregunta: "¿Cuál es la condición necesaria para aplicar el TVI en un intervalo [a, b]?", opciones: ["f(a) < f(b)", "f sea derivable", "f sea continua", "f(a) = f(b)"], respuesta: 2, explicacion: "La continuidad en [a,b] es la condición esencial para el TVI." },
    { pregunta: "¿Qué significa TVI en cálculo?", opciones: ["Teorema del Valor Intermedio", "Teorema de Valor Inicial", "Teorema de Variación Instantánea", "Teorema de Variables Independientes"], respuesta: 0, explicacion: "TVI significa Teorema del Valor Intermedio." },
    { pregunta: "¿Por qué es importante el TVI?", opciones: ["Permite garantizar la existencia de soluciones en ecuaciones continuas", "Permite derivar funciones", "Permite calcular áreas", "Permite resolver desigualdades"], respuesta: 0, explicacion: "El TVI garantiza que una función continua toma todos los valores intermedios entre dos puntos." },
    { pregunta: "¿Qué condiciones debe cumplir una función para aplicar el TVI?", opciones: ["Ser continua en el intervalo cerrado", "Ser derivable", "Ser creciente", "Ser periódica"], respuesta: 0, explicacion: "La función debe ser continua en el intervalo cerrado para aplicar el TVI." },
    { pregunta: "¿Qué tipo de problemas se resuelven con el TVI?", opciones: ["Demostrar la existencia de soluciones", "Calcular derivadas", "Sumar funciones", "Resolver ecuaciones cuadráticas"], respuesta: 0, explicacion: "El TVI se usa para demostrar la existencia de soluciones en ecuaciones continuas." },
    { pregunta: "¿El TVI garantiza el valor exacto de la solución?", opciones: ["No, solo garantiza su existencia", "Sí, siempre", "Depende de la función", "Solo si es lineal"], respuesta: 0, explicacion: "El TVI solo garantiza que existe una solución, no su valor exacto." },
  ],
  cuadraticas: [
    { pregunta: "La gráfica de f(x) = ax^2 + bx + c es:", opciones: ["Una recta", "Una parábola", "Una hipérbola", "Un círculo"], respuesta: 1, explicacion: "Las funciones cuadráticas tienen gráficas parabólicas." },
    { pregunta: "El vértice de una función cuadrática está en:", opciones: ["x = -b/(2a)", "x = -b", "x = 2a", "x = b/(2a)"], respuesta: 0, explicacion: "La coordenada x del vértice se calcula con x = -b/(2a)." },
    { pregunta: "Si f(x) = x^2 - 6x + 8, entonces sus raíces son:", opciones: ["2 y 4", "1 y 8", "3 y 3", "-2 y –4"], respuesta: 0, explicacion: "Factorizando: (x-2)(x-4) = 0, por lo tanto x=2 y x=4." },
    { pregunta: "Si el discriminante D = b^2 - 4ac < 0, la parábola:", opciones: ["Tiene dos raíces reales", "No corta el eje x", "Tiene una sola raíz", "Tiene raíces imaginarias y reales"], respuesta: 1, explicacion: "Cuando D < 0, no hay raíces reales (la parábola no corta el eje x)." },
    { pregunta: "¿Cuándo una función cuadrática tiene un mínimo absoluto?", opciones: ["Cuando a > 0", "Cuando a < 0", "Cuando b > 0", "Siempre que c > 0"], respuesta: 0, explicacion: "Si a > 0, la parábola abre hacia arriba y tiene un mínimo en el vértice." },
    { pregunta: "¿Qué es una función cuadrática?", opciones: ["Una función de la forma ax^2+bx+c", "Una función lineal", "Una función constante", "Una función cúbica"], respuesta: 0, explicacion: "Una función cuadrática es de la forma ax^2+bx+c, con a ≠ 0." },
    { pregunta: "¿Qué determina el coeficiente 'a' en una cuadrática?", opciones: ["La apertura y orientación de la parábola", "El vértice", "El eje de simetría", "El valor mínimo"], respuesta: 0, explicacion: "El coeficiente 'a' determina si la parábola abre hacia arriba o abajo y su grado de apertura." },
    { pregunta: "¿Qué es el discriminante de una cuadrática?", opciones: ["b^2-4ac", "a+b+c", "2a", "b^2+4ac"], respuesta: 0, explicacion: "El discriminante es b^2-4ac y determina la naturaleza de las raíces." },
    { pregunta: "¿Qué representa el vértice de una parábola?", opciones: ["El punto máximo o mínimo de la función", "El punto de intersección con el eje y", "El área bajo la curva", "El valor absoluto"], respuesta: 0, explicacion: "El vértice es el punto máximo o mínimo de la parábola." },
    { pregunta: "¿Para qué se usan las funciones cuadráticas en la vida real?", opciones: ["Para modelar trayectorias, áreas y optimización", "Para sumar números", "Para medir ángulos", "Para resolver ecuaciones lineales"], respuesta: 0, explicacion: "Las cuadráticas se usan para modelar trayectorias, áreas, optimización, etc." },
  ]
};

// Función para mezclar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// SVG Corona para el auto ganador
const Corona = () => (
  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-10 left-1/2 -translate-x-1/2 drop-shadow-lg">
    <path d="M4 24L12 8L24 20L36 8L44 24" stroke="#FFD700" strokeWidth="4" fill="none"/>
    <circle cx="12" cy="8" r="3" fill="#FFD700" stroke="#FFC700" strokeWidth="2"/>
    <circle cx="36" cy="8" r="3" fill="#FFD700" stroke="#FFC700" strokeWidth="2"/>
    <circle cx="24" cy="20" r="3" fill="#FFD700" stroke="#FFC700" strokeWidth="2"/>
  </svg>
);

export default function Carrera() {
  const [jugador1, setJugador1] = useState(0);
  const [jugador2, setJugador2] = useState(0);
  const [turno, setTurno] = useState(1);
  const [iniciado, setIniciado] = useState(false);
  const [nombres, setNombres] = useState({ j1: '', j2: '' });
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [explicacion, setExplicacion] = useState(null);
  const [ronda, setRonda] = useState(1);
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [mostrarSeleccionCategoria, setMostrarSeleccionCategoria] = useState(false);
  const [preguntasDisponibles, setPreguntasDisponibles] = useState({});
  const [esperandoContinuar, setEsperandoContinuar] = useState(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [avancePorPregunta, setAvancePorPregunta] = useState(10);
  const [showBonus, setShowBonus] = useState(false);
  const [bonusStep, setBonusStep] = useState(0);
  const [bonusAnswers, setBonusAnswers] = useState({});

  // Confeti seguro para SSR/hidratación
  const [confetiData, setConfetiData] = useState([]);
  useEffect(() => {
    setConfetiData(
      Array.from({ length: 40 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  // Super Pregunta Bonus control
  const [bonusDisponible, setBonusDisponible] = useState(true);
  const [rondaBonus, setRondaBonus] = useState(null);
  const [bonusFeedback, setBonusFeedback] = useState({});
  const [bonusFinalizado, setBonusFinalizado] = useState(false);
  const rondaRef = useRef(1);

  // Elegir ronda aleatoria para bonus al iniciar
  useEffect(() => {
    if (iniciado) {
      setBonusDisponible(true);
      setBonusFinalizado(false);
      setBonusFeedback({});
      // Elegir ronda aleatoria entre 1 y 4
      setRondaBonus(Math.floor(Math.random() * 4) + 1);
    }
  }, [iniciado]);

  // Forzar bonus en ronda 4 si no apareció antes
  useEffect(() => {
    if (iniciado && ronda > 3 && bonusDisponible && rondaBonus > 4) {
      setRondaBonus(4);
    }
  }, [ronda, iniciado, bonusDisponible, rondaBonus]);

  // Actualizar rondaRef para control interno
  useEffect(() => {
    rondaRef.current = ronda;
  }, [ronda]);

  // Inicializar preguntas aleatorias por categoría
  useEffect(() => {
    if (iniciado) {
      const preguntasMezcladas = {};
      Object.keys(preguntasPorCategoria).forEach(cat => {
        preguntasMezcladas[cat] = shuffleArray([...preguntasPorCategoria[cat]]);
      });
      setPreguntasDisponibles(preguntasMezcladas);
      seleccionarCategoriaAleatoria(preguntasMezcladas);
    }
  }, [iniciado]);

  // Selecciona una categoría aleatoria con preguntas disponibles
  const seleccionarCategoriaAleatoria = (pregs = preguntasDisponibles) => {
    const categoriasConPreguntas = Object.keys(pregs).filter(cat => pregs[cat] && pregs[cat].length > 0);
    if (categoriasConPreguntas.length === 0) {
      setCategoriaActual(null);
      setPreguntaActual(null);
      return;
    }
    const categoria = categoriasConPreguntas[Math.floor(Math.random() * categoriasConPreguntas.length)];
    setCategoriaActual(categoria);
    seleccionarPreguntaAleatoria(categoria, pregs);
  };

  // Selecciona una pregunta aleatoria de la categoría actual
  const seleccionarPreguntaAleatoria = (categoria, pregs = preguntasDisponibles) => {
    if (!pregs[categoria] || pregs[categoria].length === 0) {
      seleccionarCategoriaAleatoria(pregs);
      return;
    }
    const idx = Math.floor(Math.random() * pregs[categoria].length);
    setPreguntaActual({ ...pregs[categoria][idx], idx });
  };

  // Cuando el usuario selecciona una categoría manualmente
  const seleccionarCategoria = (categoria) => {
    setCategoriaActual(categoria);
    seleccionarPreguntaAleatoria(categoria);
    setMostrarSeleccionCategoria(false);
  };

  // Avanzar: igual, pero usando preguntaActual.idx
  const avanzar = (opcionSeleccionada) => {
    if (!preguntaActual) return;
    const pregunta = preguntaActual;
    const esCorrecto = opcionSeleccionada === pregunta.respuesta;
    setFeedback(esCorrecto ? "✅ ¡Respuesta correcta!" : "❌ Respuesta incorrecta");
    setExplicacion(pregunta.explicacion);
    setEsperandoContinuar(true);
    setRespuestaCorrecta(esCorrecto);
  };

  // Continuar ronda: eliminar la pregunta usada y seleccionar otra aleatoria
  const continuarRonda = () => {
    if (!preguntaActual) return;
    // Eliminar la pregunta usada
    setPreguntasDisponibles(prev => {
      const nuevo = { ...prev };
      if (nuevo[categoriaActual]) {
        nuevo[categoriaActual] = nuevo[categoriaActual].filter((_, i) => i !== preguntaActual.idx);
      }
      return nuevo;
    });
    // Avance y turno igual
    if (turno === 1) {
      if (respuestaCorrecta) setJugador1(j => Math.min(j + avancePorPregunta, 100));
      setTurno(2);
    } else {
      if (respuestaCorrecta) setJugador2(j => Math.min(j + avancePorPregunta, 100));
      setTurno(1);
      setRonda(r => r + 1);
      if ((ronda + 1) % 2 === 0) {
        setMostrarSeleccionCategoria(true);
      }
    }
    // Seleccionar siguiente pregunta aleatoria tras un pequeño delay para asegurar el setPreguntasDisponibles
    setTimeout(() => {
      if (preguntasDisponibles[categoriaActual] && preguntasDisponibles[categoriaActual].length > 1) {
        seleccionarPreguntaAleatoria(categoriaActual, {
          ...preguntasDisponibles,
          [categoriaActual]: preguntasDisponibles[categoriaActual].filter((_, i) => i !== preguntaActual.idx)
        });
      } else {
        seleccionarCategoriaAleatoria({
          ...preguntasDisponibles,
          [categoriaActual]: preguntasDisponibles[categoriaActual].filter((_, i) => i !== preguntaActual.idx)
        });
      }
    }, 0);
    setFeedback(null);
    setExplicacion(null);
    setEsperandoContinuar(false);
    setRespuestaCorrecta(false);
  };

  const ganador = jugador1 >= 100 ? nombres.j1 || "Jugador 1" : jugador2 >= 100 ? nombres.j2 || "Jugador 2" : null;

  const bonusQuestions = [
    {
      pregunta: '¿Cuál es el dominio de la función mostrada?',
      opciones: [
        '[-2, 3]',
        '(-∞, ∞)',
        '[-3, 3]',
        '[-2, 2]'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿Cuál es el recorrido (rango) de la función?',
      opciones: [
        '[-3, 3]',
        '(-∞, ∞)',
        '[0, 3]',
        '[-2, 2]'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿Cuáles son los ceros de la función?',
      opciones: [
        'x = -1.5, x = 0.45, x = 1.5',
        'x = -2, x = 0, x = 2',
        'x = -3, x = 0, x = 3',
        'x = -1, x = 1'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿En qué intervalos la función es positiva?',
      opciones: [
        '(-1.5, -0.45) ∪ (1.5, 3]',
        '(-∞, 0)',
        '(-2, 0)',
        '(-1.5, 1.5)'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿En qué intervalos la función es negativa?',
      opciones: [
        '[-2, -1.5) ∪ (0.45, 1.5)',
        '(-∞, 0)',
        '(-2, 0)',
        '(-1.5, 1.5)'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿En qué intervalos la función es creciente?',
      opciones: [
        '(-2, -0.5) ∪ (1, 3)',
        '(-∞, 0)',
        '(-2, 0)',
        '(-1.5, 1.5)'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿En qué intervalos la función es decreciente?',
      opciones: [
        '(-0.5, 1)',
        '(-∞, 0)',
        '(-2, 0)',
        '(-1.5, 1.5)'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿Dónde hay un mínimo absoluto?',
      opciones: [
        '(-2, -3)',
        '(0, 0)',
        '(3, 3)',
        '(1, -2)'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿La función está acotada?',
      opciones: [
        'Sí, superior e inferiormente',
        'No está acotada',
        'Solo superiormente',
        'Solo inferiormente'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿Presenta simetría la función?',
      opciones: [
        'No presenta ningún tipo de paridad',
        'Es par',
        'Es impar',
        'Es periódica'
      ],
      respuesta: 0
    },
    {
      pregunta: '¿La función es periódica?',
      opciones: [
        'No es periódica',
        'Sí, con periodo 2',
        'Sí, con periodo 3',
        'Sí, con periodo 1'
      ],
      respuesta: 0
    }
  ];

  // Mostrar botón de bonus solo si está disponible y es la ronda correcta
  const mostrarBonus = iniciado && !ganador && bonusDisponible && ronda === rondaBonus;

  // Lógica de feedback y avance para la pregunta bonus
  const handleBonusFinalizar = () => {
    // Calcular respuestas correctas
    let correctas = 0;
    const feedback = {};
    bonusQuestions.forEach((q, idx) => {
      if (bonusAnswers[idx] === q.respuesta) {
        correctas++;
        feedback[idx] = { correcto: true, correcta: q.opciones[q.respuesta] };
      } else {
        feedback[idx] = { correcto: false, correcta: q.opciones[q.respuesta] };
      }
    });
    setBonusFeedback(feedback);
    setBonusFinalizado(true);
  };

  const handleBonusReclamar = () => {
    // Reclamar avance proporcional
    const correctas = Object.values(bonusFeedback).filter(f => f.correcto).length;
    const avance = Math.round((correctas / bonusQuestions.length) * 3 * avancePorPregunta);
    if (turno === 1) {
      setJugador1(j => Math.min(j + avance, 100));
      setTurno(2);
    } else {
      setJugador2(j => Math.min(j + avance, 100));
      setTurno(1);
    }
    setShowBonus(false);
    setBonusDisponible(false);
    setBonusFinalizado(false);
    setBonusAnswers({});
    setBonusStep(0);
    setBonusFeedback({});
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Fondo de símbolos matemáticos decorativos */}
      <div className="pointer-events-none select-none absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 text-7xl text-blue-900 animate-spin-slow"><FaInfinity /></div>
        <div className="absolute top-1/2 left-1/4 text-6xl text-purple-900 animate-float"><FaSquareRootAlt /></div>

        <div className="absolute bottom-1/3 left-1/2 text-6xl text-yellow-900 animate-float"><FaPlus /></div>
        <div className="absolute top-1/4 right-1/3 text-5xl text-pink-900 animate-float"><FaDivide /></div>
        <div className="absolute bottom-10 left-1/5 text-6xl text-cyan-900 animate-spin-slow"><FaEquals /></div>
        <div className="absolute top-1/3 right-10 text-7xl text-indigo-900 animate-float"><FaMinus /></div>
      </div>
      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-3xl mx-auto bg-gray-950 bg-opacity-90 rounded-3xl shadow-2xl p-8 border border-gray-800">
          {/* Barra superior */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              
              <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow">Carrera de Cálculo</h1>
            </div>
            <span className="text-lg font-bold text-gray-300">Ronda: <span className="text-green-400">{ronda}</span></span>
          </div>
          {/* Barra de tema */}
          {categoriaActual && (
            <div className="flex items-center justify-center mb-6">
              <span className="text-md font-semibold text-blue-300 bg-gray-800 px-4 py-1 rounded-full shadow">Tema: <span className="capitalize">{categoriaActual}</span></span>
            </div>
          )}
          {/* Barras de progreso tipo carrera con autos encima */}
          <div className="flex flex-col gap-8 mb-8">
            {/* Jugador 1 */}
            <div>
              <div className="flex items-center mb-1">
                <span className="text-red-400 font-bold text-lg">{nombres.j1 || 'Jugador 1'}</span>
              </div>
              <div className="relative h-12 w-full max-w-xl mx-auto">
                {/* Barra de fondo */}
                <div className="absolute top-1/2 left-0 w-full h-4 bg-gray-800 rounded-full -translate-y-1/2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-yellow-400 rounded-full transition-all duration-700" style={{ width: `${jugador1}%` }}></div>
                </div>
                {/* Carro encima de la barra */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-700"
                  style={{ left: `calc(${jugador1}% - 20px)` }}
                >
                  <Image src="/carro1.jpg" alt="Carro 1" width={40} height={20} className="rounded shadow" />
                </div>
              </div>
              <div className="flex justify-end w-full max-w-xl mx-auto mt-1">
                <span className="text-white font-mono text-sm">{jugador1}%</span>
              </div>
            </div>
            {/* Jugador 2 */}
            <div>
              <div className="flex items-center mb-1">
                <span className="text-blue-400 font-bold text-lg">{nombres.j2 || 'Jugador 2'}</span>
              </div>
              <div className="relative h-12 w-full max-w-xl mx-auto">
                {/* Barra de fondo */}
                <div className="absolute top-1/2 left-0 w-full h-4 bg-gray-800 rounded-full -translate-y-1/2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-700" style={{ width: `${jugador2}%` }}></div>
                </div>
                {/* Carro encima de la barra */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-700"
                  style={{ left: `calc(${jugador2}% - 20px)` }}
                >
                  <Image src="/carro2.jpg" alt="Carro 2" width={40} height={20} className="rounded shadow" />
                </div>
              </div>
              <div className="flex justify-end w-full max-w-xl mx-auto mt-1">
                <span className="text-white font-mono text-sm">{jugador2}%</span>
              </div>
            </div>
          </div>
          {/* Contenido principal del juego */}
          {!iniciado ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-200 font-medium">Nombre del Jugador 1</label>
                <input className="w-full border border-gray-700 bg-gray-900 px-3 py-2 rounded text-white focus:ring-2 focus:ring-purple-500"
                  value={nombres.j1}
                  onChange={(e) => setNombres({ ...nombres, j1: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-200 font-medium">Nombre del Jugador 2</label>
                <input className="w-full border border-gray-700 bg-gray-900 px-3 py-2 rounded text-white focus:ring-2 focus:ring-blue-500"
                  value={nombres.j2}
                  onChange={(e) => setNombres({ ...nombres, j2: e.target.value })}
                />
              </div>
              {/* Configuración de avance */}
              <div>
                <label className="block text-gray-200 font-medium mb-2">¿Cuánto avanza el auto por respuesta correcta?</label>
                <div className="flex gap-4">
                  <button
                    className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${avancePorPregunta === 10 ? 'bg-blue-600 text-white border-blue-400' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-blue-900'}`}
                    onClick={() => setAvancePorPregunta(10)}
                  >
                    10% (10 preguntas)
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${avancePorPregunta === 25 ? 'bg-green-600 text-white border-green-400' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-green-900'}`}
                    onClick={() => setAvancePorPregunta(25)}
                  >
                    25% (4 preguntas)
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${avancePorPregunta === 50 ? 'bg-yellow-500 text-white border-yellow-300' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-yellow-900'}`}
                    onClick={() => setAvancePorPregunta(50)}
                  >
                    50% (2 preguntas)
                  </button>
                </div>
              </div>
              <button
                onClick={() => setIniciado(true)}
                className="w-full bg-green-600 text-white px-4 py-3 rounded-xl font-bold text-lg shadow hover:bg-green-700 transition"
              >
                Iniciar Juego
              </button>
            </div>
          ) : (
            <>
              {!ganador ? (
                <div className="space-y-6">
                  {mostrarSeleccionCategoria ? (
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold mb-6 text-purple-300">Selecciona el tema para las próximas preguntas:</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {Object.keys(preguntasPorCategoria).map(categoria => (
                          <button
                            key={categoria}
                            onClick={() => seleccionarCategoria(categoria)}
                            className="bg-purple-700 text-white py-3 px-4 rounded-2xl font-bold text-lg shadow hover:bg-purple-800 capitalize border-2 border-purple-900"
                          >
                            {categoria}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                        Turno de <span className="text-green-400">{turno === 1 ? (nombres.j1 || 'Jugador 1') : (nombres.j2 || 'Jugador 2')}</span>
                      </h2>
                      {preguntaActual !== null && categoriaActual && (
                        <div className="flex flex-col gap-6 items-center">
                          <div className="w-full bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
                            <p className="text-xl font-mono text-blue-200 text-center mb-4">
                              {preguntaActual.pregunta}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {preguntaActual.opciones.map((op, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => avanzar(idx)}
                                  className={`py-3 px-4 rounded-xl font-bold text-lg shadow border-2 transition-all
                                    ${feedback !== null ? 'cursor-not-allowed opacity-60' : 'hover:scale-105'}
                                    bg-gray-800 border-gray-700 text-white hover:bg-blue-700 hover:border-blue-400`}
                                  disabled={feedback !== null}
                                >
                                  {op}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {feedback && (
                        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60">
                          <div className="bg-gray-900 border-2 border-blue-700 rounded-2xl p-8 shadow-2xl max-w-md w-full text-center animate-fade-in">
                            <p className="text-2xl font-bold mb-2 text-white">{feedback}</p>
                            <p className="mt-2 text-blue-200 text-lg font-mono">{explicacion}</p>
                            {esperandoContinuar && (
                              <button
                                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow hover:bg-green-700 transition"
                                onClick={continuarRonda}
                              >
                                Continuar
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black bg-opacity-90 animate-fade-in">
                  {/* Confeti animado */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden z-40">
                    {confetiData.map((c, i) => (
                      <div
                        key={i}
                        className={`confeti confeti-${i % 8}`}
                        style={{ left: `${c.left}%`, animationDelay: `${c.delay}s` }}
                      />
                    ))}
                  </div>
                  {/* Auto ganador con corona */}
                  <div className="relative flex flex-col items-center mb-8 z-50">
                    <div className="relative animate-bounce-slow">
                      <Corona />
                      <Image
                        src={jugador1 >= 100 ? "/carro1.jpg" : "/carro2.jpg"}
                        alt="Auto ganador"
                        width={120}
                        height={60}
                        className="rounded-2xl shadow-2xl border-4 border-yellow-400"
                      />
                    </div>
                    <h2 className="text-4xl font-extrabold text-yellow-300 mt-8 mb-2 drop-shadow-lg animate-fade-in">
                      🏁 ¡{ganador} ha ganado la carrera!
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setJugador1(0);
                      setJugador2(0);
                      setRonda(1);
                      setTurno(1);
                      setFeedback(null);
                      setExplicacion(null);
                      setIniciado(false);
                    }}
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-xl hover:scale-105 transition mt-4 z-50"
                  >
                    Jugar de nuevo
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Animaciones personalizadas para símbolos */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-spin-reverse { animation: spin-reverse 22s linear infinite; }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.4s ease; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
        /* Confeti animado */
        .confeti {
          position: absolute;
          top: -40px;
          width: 16px;
          height: 16px;
          border-radius: 4px;
          opacity: 0.8;
          animation: confeti-fall 2.5s linear infinite;
        }
        .confeti-0 { background: #FFD700; }
        .confeti-1 { background: #FF69B4; }
        .confeti-2 { background: #00E6FF; }
        .confeti-3 { background: #7CFC00; }
        .confeti-4 { background: #FF4500; }
        .confeti-5 { background: #8A2BE2; }
        .confeti-6 { background: #FFF; }
        .confeti-7 { background: #FFB300; }
        @keyframes confeti-fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
      `}</style>
      {/* Botón de Super Pregunta Bonus */}
      {mostrarBonus && (
        <div className="absolute top-4 left-4 z-50">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg shadow-lg border-2 border-yellow-600"
            onClick={() => { setShowBonus(true); setBonusStep(0); setBonusAnswers({}); setBonusFinalizado(false); setBonusFeedback({}); }}
            disabled={!bonusDisponible}
          >
            Super Pregunta Bonus
          </button>
        </div>
      )}
      {showBonus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl max-w-lg w-full relative max-h-[90vh] flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
              <button
                className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-400"
                onClick={() => setShowBonus(false)}
                disabled={bonusFinalizado}
              >×</button>
              <h2 className="text-2xl font-bold text-yellow-300 mb-4 text-center">Super Pregunta Bonus</h2>
              <div className="flex justify-center mb-4">
                <Image src="/bonus_grafica.png" alt="Gráfica Bonus" width={260} height={180} className="rounded shadow-lg bg-white" />
              </div>
              <div className="mb-4">
                <p className="text-lg text-white font-semibold mb-2">{bonusQuestions[bonusStep].pregunta}</p>
                <div className="grid grid-cols-1 gap-2">
                  {bonusQuestions[bonusStep].opciones.map((op, idx) => (
                    <button
                      key={idx}
                      className={`w-full py-2 px-3 rounded-lg font-bold border-2 transition-all ${bonusAnswers[bonusStep] === idx ? 'bg-green-500 text-white border-green-700' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-blue-900'}`}
                      onClick={() => setBonusAnswers({ ...bonusAnswers, [bonusStep]: idx })}
                      disabled={bonusFinalizado}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>
              {/* Feedback de cada respuesta al finalizar */}
              {bonusFinalizado && (
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-2">Resultados:</h3>
                  <ul className="text-white text-base space-y-3">
                    {bonusQuestions.map((q, idx) => (
                      <li key={idx} className="border-b border-gray-700 pb-2">
                        <div className="font-semibold text-blue-200 mb-1">{q.pregunta}</div>
                        <span className={bonusFeedback[idx]?.correcto ? 'text-green-400' : 'text-red-400'}>
                          {bonusFeedback[idx]?.correcto ? '✔️ Correcto' : '❌ Incorrecto'}
                        </span>
                        <div>
                          <span className="text-gray-300">Respuesta correcta: </span>
                          <span className="text-yellow-300">{bonusFeedback[idx]?.correcta}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-blue-200 font-bold">Avance: {Math.round((Object.values(bonusFeedback).filter(f => f.correcto).length / bonusQuestions.length) * 3 * avancePorPregunta)}%</p>
                  <button
                    className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow hover:bg-green-700 transition"
                    onClick={handleBonusReclamar}
                  >
                    Finalizar y reclamar recompensa
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600"
                onClick={() => setBonusStep(s => Math.max(0, s - 1))}
                disabled={bonusStep === 0 || bonusFinalizado}
              >Anterior</button>
              {bonusStep < bonusQuestions.length - 1 ? (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
                  onClick={() => setBonusStep(s => s + 1)}
                  disabled={typeof bonusAnswers[bonusStep] === 'undefined' || bonusFinalizado}
                >Siguiente</button>
              ) : (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700"
                  onClick={handleBonusFinalizar}
                  disabled={typeof bonusAnswers[bonusStep] === 'undefined' || bonusFinalizado}
                >Finalizar</button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}