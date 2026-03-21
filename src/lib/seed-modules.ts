export const ALL_MODULES = [
  // ═══════════════════════════════════════════════════════════════════════
  // ── Foundations & Logic (MSC 00, 03, 97) ───────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════

  // MSC 00 — General
  {
    id: "problem-solving",
    title: "Problem Solving",
    description: "General strategies and heuristics for tackling mathematical problems of all kinds.",
    author: "MathGraph Team",
    color: "#a78bfa",
    icon: "lightbulb",
    code: "MSC 00",
    category: "Foundations & Logic",
    motivation:
      "Knowing theorems is not enough — you must learn to wield them. Problem solving is the art of navigating from a question to an answer when no recipe is given. Through carefully chosen problems and battle-tested strategies, this module trains your mathematical instincts so that when you face the unknown, you have a toolkit of approaches ready to deploy.",
    bibliography: JSON.stringify([
      { title: "How to Solve It", author: "George Polya", level: "intro" },
      { title: "Problem-Solving Through Recreational Mathematics", author: "Averbach, Chein", level: "intro" },
      { title: "The Art and Craft of Problem Solving", author: "Paul Zeitz", level: "intermediate" },
      { title: "Putnam and Beyond", author: "Razvan Gelca, Titu Andreescu", level: "advanced" },
    ]),
    isMeta: true,
    posX: 0,
    posY: 0,
  },
  {
    id: "philosophy-of-math",
    title: "Philosophy of Mathematics",
    description: "Foundational questions about the nature, truth, and meaning of mathematics.",
    author: "MathGraph Team",
    color: "#c084fc",
    icon: "lightbulb",
    code: "MSC 00",
    category: "Foundations & Logic",
    motivation:
      "Do mathematical objects exist independently of the human mind, or are they our invention? What does it mean for a theorem to be true? The philosophy of mathematics grapples with these deep questions, examining the foundations on which the entire discipline rests. Whether you lean toward Platonism, formalism, or intuitionism, engaging with these ideas will sharpen your understanding of what mathematics really is.",
    bibliography: JSON.stringify([
      { title: "Thinking about Mathematics", author: "Stewart Shapiro", level: "intro" },
      { title: "Philosophy of Mathematics: Selected Readings", author: "Paul Benacerraf, Hilary Putnam", level: "advanced" },
      { title: "Introduction to the Philosophy of Mathematics", author: "Mark Colyvan", level: "intermediate" },
      { title: "What Is Mathematics, Really?", author: "Reuben Hersh", level: "intro" },
    ]),
    isMeta: true,
    posX: 0,
    posY: 0,
  },

  // MSC 01 — History and biography
  {
    id: "history-of-math",
    title: "History of Mathematics",
    description: "The evolution of mathematical ideas from antiquity to the modern era.",
    author: "MathGraph Team",
    color: "#d946ef",
    icon: "book",
    code: "MSC 01",
    category: "History & Culture",
    motivation:
      "Mathematics did not spring into existence fully formed — it was built by real people, across millennia, driven by curiosity, rivalry, and necessity. Understanding the history of mathematics enriches every theorem you learn: you see why the questions were asked, what wrong turns were taken, and how breakthroughs emerged. It transforms mathematics from a static collection of facts into a living, human story.",
    bibliography: JSON.stringify([
      { title: "A History of Mathematics", author: "Victor J. Katz", level: "intermediate" },
      { title: "Journey through Genius", author: "William Dunham", level: "intro" },
      { title: "Mathematics and Its History", author: "John Stillwell", level: "intermediate" },
      { title: "Men of Mathematics", author: "E.T. Bell", level: "intro" },
      { title: "The Princeton Companion to Mathematics", author: "Timothy Gowers et al.", level: "advanced" },
    ]),
    isMeta: true,
    posX: 0,
    posY: 0,
  },

  // MSC 03 — Mathematical logic and foundations
  {
    id: "mathematical-logic",
    title: "Mathematical Logic",
    description: "Formal systems, propositional and predicate logic, completeness, and incompleteness theorems.",
    author: "MathGraph Team",
    color: "#8b5cf6",
    icon: "cpu",
    code: "MSC 03",
    category: "Foundations & Logic",
    motivation:
      "Mathematical logic asks the most fundamental question of all: what can be proved, and what lies forever beyond the reach of proof? From Godel's shattering incompleteness theorems to the foundations of computer science, logic is where mathematics turns its gaze inward and examines its own power and limitations. There is no deeper inquiry.",
    bibliography: JSON.stringify([
      { title: "A Mathematical Introduction to Logic", author: "Herbert B. Enderton", level: "intermediate" },
      { title: "Logic for Mathematicians", author: "A.G. Hamilton", level: "intro" },
      { title: "Godel's Proof", author: "Ernest Nagel, James R. Newman", level: "intro" },
      { title: "Model Theory: An Introduction", author: "David Marker", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },
  {
    id: "proof-writing",
    title: "How to Write Proofs",
    description: "Techniques and strategies for constructing clear, correct mathematical proofs.",
    author: "MathGraph Team",
    color: "#7c3aed",
    icon: "lightbulb",
    code: "MSC 03",
    category: "Foundations & Logic",
    motivation:
      "Proof is the heartbeat of mathematics. Without it, a claim is just a guess. This module teaches you the craft of proof — direct arguments, contradiction, induction, contraposition — so you can move from passively reading mathematics to actively creating it. Every serious mathematics student must master this skill early.",
    bibliography: JSON.stringify([
      { title: "How to Prove It", author: "Daniel J. Velleman", level: "intro" },
      { title: "Book of Proof", author: "Richard Hammack", level: "intro" },
      { title: "How to Solve It", author: "George Polya", level: "intro" },
      { title: "Proofs and Fundamentals", author: "Ethan D. Bloch", level: "intermediate" },
    ]),
    isMeta: true,
    posX: 0,
    posY: 0,
  },

  // MSC 97 — Mathematics education
  {
    id: "mathematics-education",
    title: "Mathematics Education",
    description: "Research and practice in the teaching and learning of mathematics at all levels.",
    author: "MathGraph Team",
    color: "#9333ea",
    icon: "book",
    code: "MSC 97",
    category: "Foundations & Logic",
    motivation:
      "How do people actually learn mathematics, and how can we teach it better? Mathematics education research draws on cognitive science, curriculum design, and classroom practice to improve how mathematical ideas are communicated. Understanding this field makes you a better learner and a better explainer.",
    bibliography: JSON.stringify([
      { title: "How to Think Like a Mathematician", author: "Kevin Houston", level: "intro" },
      { title: "Mathematical Mindsets", author: "Jo Boaler", level: "intro" },
      { title: "The Art of Problem Posing", author: "Stephen I. Brown, Marion I. Walter", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ── Algebra (MSC 05, 06, 08, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22)
  // ═══════════════════════════════════════════════════════════════════════

  // MSC 05 — Combinatorics
  {
    id: "combinatorics",
    title: "Combinatorics",
    description: "The art of counting, arranging, and analyzing discrete structures.",
    author: "MathGraph Team",
    color: "#6366f1",
    icon: "grid",
    code: "MSC 05",
    category: "Algebra",
    motivation:
      "How many ways can you seat ten guests around a table? How many paths cross a grid? Combinatorics turns these innocent-sounding questions into a rich theory with deep connections to algebra, probability, and computer science. It is the mathematics of choice and arrangement, and it is everywhere — from poker to cryptography to algorithm design.",
    bibliography: JSON.stringify([
      { title: "Combinatorics: Topics, Techniques, Algorithms", author: "Peter J. Cameron", level: "intro" },
      { title: "Enumerative Combinatorics, Vol. 1", author: "Richard P. Stanley", level: "advanced" },
      { title: "A Walk Through Combinatorics", author: "Miklós Bóna", level: "intermediate" },
      { title: "Generatingfunctionology", author: "Herbert S. Wilf", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 06 — Order, lattices, ordered algebraic structures
  {
    id: "order-lattices",
    title: "Order & Lattice Theory",
    description: "Partially ordered sets, lattices, and ordered algebraic structures that formalize hierarchical relationships.",
    author: "MathGraph Team",
    color: "#818cf8",
    icon: "layers",
    code: "MSC 06",
    category: "Algebra",
    motivation:
      "Order is one of the most pervasive structures in mathematics: subsets ordered by inclusion, numbers by magnitude, propositions by implication. Lattice theory distills these patterns into an elegant algebraic framework that underpins logic, universal algebra, and theoretical computer science.",
    bibliography: JSON.stringify([
      { title: "Introduction to Lattices and Order", author: "B.A. Davey, H.A. Priestley", level: "intermediate" },
      { title: "Lattice Theory: Foundation", author: "George Grätzer", level: "advanced" },
      { title: "Ordered Sets", author: "Bernd Schröder", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 08 — General algebraic systems
  {
    id: "abstract-algebra",
    title: "Abstract Algebra",
    description: "Groups, rings, fields, and the unifying structures that underpin modern algebra.",
    author: "MathGraph Team",
    color: "#4f46e5",
    icon: "layers",
    code: "MSC 08",
    category: "Algebra",
    motivation:
      "Abstract algebra teaches you to see the skeleton beneath the flesh of mathematics. When you realize that integers under addition and rotations of a square obey the same abstract laws, a whole new world opens up. This is the course where mathematics becomes truly modern — and truly powerful.",
    bibliography: JSON.stringify([
      { title: "Algebra: Chapter 0", author: "Paolo Aluffi", level: "advanced" },
      { title: "Abstract Algebra", author: "David S. Dummit, Richard M. Foote", level: "advanced" },
      { title: "A Book of Abstract Algebra", author: "Charles C. Pinter", level: "intro" },
      { title: "Topics in Algebra", author: "I.N. Herstein", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 11 — Number theory
  {
    id: "arithmetic",
    title: "Number Theory",
    description: "Elementary number theory: divisibility, primes, congruences, and Diophantine equations.",
    author: "MathGraph Team",
    color: "#4338ca",
    icon: "star",
    code: "MSC 11",
    category: "Algebra",
    motivation:
      "Number theory is the queen of mathematics, as Gauss famously declared. Starting from the humblest objects — the integers — it builds toward some of the most beautiful and difficult open problems in all of science. From the distribution of prime numbers to modern cryptography, arithmetic is both ancient and urgently contemporary.",
    bibliography: JSON.stringify([
      { title: "An Introduction to the Theory of Numbers", author: "G.H. Hardy, E.M. Wright", level: "intermediate" },
      { title: "Elementary Number Theory", author: "David M. Burton", level: "intro" },
      { title: "Number Theory: A Very Short Introduction", author: "Robin Wilson", level: "intro" },
      { title: "Ireland and Rosen: A Classical Introduction to Modern Number Theory", author: "Kenneth Ireland, Michael Rosen", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },
  {
    id: "analytic-number-theory",
    title: "Analytic Number Theory",
    description: "Using methods of analysis to solve problems about the integers and the distribution of primes.",
    author: "MathGraph Team",
    color: "#3730a3",
    icon: "chart",
    code: "MSC 11",
    category: "Algebra",
    motivation:
      "How are the prime numbers distributed among all integers? This deceptively simple question launched one of the most fertile branches of mathematics, deploying the heavy artillery of complex analysis and Fourier analysis against the integers. The Riemann Hypothesis — still unproved — sits at its heart, offering a million-dollar bounty for anyone who can settle it.",
    bibliography: JSON.stringify([
      { title: "Introduction to Analytic Number Theory", author: "Tom M. Apostol", level: "intermediate" },
      { title: "Multiplicative Number Theory I", author: "Hugh L. Montgomery, Robert C. Vaughan", level: "advanced" },
      { title: "The Distribution of Prime Numbers", author: "Dimitris Koukoulopoulos", level: "advanced" },
      { title: "Prime Obsession", author: "John Derbyshire", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 12 — Field theory and polynomials
  {
    id: "polynomials",
    title: "Polynomials",
    description: "Study of polynomial expressions, their roots, factorization, and algebraic properties.",
    author: "MathGraph Team",
    color: "#6366f1",
    icon: "function",
    code: "MSC 12",
    category: "Algebra",
    motivation:
      "Polynomials are the simplest non-trivial objects in all of algebra, yet they encode an astonishing depth of structure. From solving quadratic equations in ancient Babylon to modern error-correcting codes, polynomials appear everywhere. Master them and you hold the master key to the rest of algebra.",
    bibliography: JSON.stringify([
      { title: "Polynomials", author: "Victor V. Prasolov", level: "intermediate" },
      { title: "Algebra", author: "Michael Artin", level: "intermediate" },
      { title: "Abstract Algebra", author: "David S. Dummit, Richard M. Foote", level: "advanced" },
      { title: "Precalculus Mathematics in a Nutshell", author: "George F. Simmons", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois",
    title: "Galois Theory",
    description: "The deep connection between field extensions and group theory that settles the solvability of polynomial equations.",
    author: "MathGraph Team",
    color: "#7c3aed",
    icon: "star",
    code: "MSC 12",
    category: "Algebra",
    motivation:
      "Galois theory is one of the crown jewels of mathematics. Born from the mind of a twenty-year-old who would die in a duel the very next day, it answers a question humanity had asked for centuries: which polynomial equations can be solved by radicals? The answer reveals a breathtaking interplay between symmetry and structure that reverberates across all of modern algebra.",
    bibliography: JSON.stringify([
      { title: "Galois Theory", author: "Ian Stewart", level: "intermediate" },
      { title: "Fields and Galois Theory", author: "J.S. Milne", level: "intermediate" },
      { title: "Algebra", author: "Serge Lang", level: "advanced" },
      { title: "A Book of Abstract Algebra", author: "Charles C. Pinter", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 13 — Commutative algebra
  {
    id: "commutative-algebra",
    title: "Commutative Algebra",
    description: "The study of commutative rings, ideals, and modules — the algebraic engine behind algebraic geometry.",
    author: "MathGraph Team",
    color: "#5b21b6",
    icon: "layers",
    code: "MSC 13",
    category: "Algebra",
    motivation:
      "Commutative algebra is the local study of geometry through the lens of rings and ideals. Every algebraic variety has a coordinate ring, and understanding that ring reveals the geometry's deepest secrets. This subject is the indispensable bridge between abstract algebra and algebraic geometry.",
    bibliography: JSON.stringify([
      { title: "Introduction to Commutative Algebra", author: "M.F. Atiyah, I.G. Macdonald", level: "intermediate" },
      { title: "Commutative Algebra with a View Toward Algebraic Geometry", author: "David Eisenbud", level: "advanced" },
      { title: "Steps in Commutative Algebra", author: "R.Y. Sharp", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 14 — Algebraic geometry
  {
    id: "algebraic-geometry",
    title: "Algebraic Geometry",
    description: "The study of geometric objects defined by polynomial equations, unifying algebra and geometry.",
    author: "MathGraph Team",
    color: "#4c1d95",
    icon: "circle",
    code: "MSC 14",
    category: "Algebra",
    motivation:
      "Algebraic geometry is one of the most ambitious branches of modern mathematics, weaving together commutative algebra, topology, and complex analysis to study the solutions of polynomial equations geometrically. From elliptic curves that secure the internet to the proof of Fermat's Last Theorem, its reach is extraordinary.",
    bibliography: JSON.stringify([
      { title: "Algebraic Geometry", author: "Robin Hartshorne", level: "advanced" },
      { title: "An Invitation to Algebraic Geometry", author: "Karen E. Smith et al.", level: "intro" },
      { title: "Algebraic Curves and Riemann Surfaces", author: "Rick Miranda", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 15 — Linear and multilinear algebra; matrix theory
  {
    id: "linear-algebra",
    title: "Linear Algebra",
    description: "Theory of vector spaces, linear transformations, matrices, and eigenvalues.",
    author: "MathGraph Team",
    color: "#818cf8",
    icon: "grid",
    code: "MSC 15",
    category: "Algebra",
    motivation:
      "Linear algebra is the workhorse of modern mathematics. Whether you want to train a neural network, solve a system of differential equations, or understand quantum mechanics, you will need to think in terms of vectors and linear maps. It is the language that unifies an extraordinary range of disciplines.",
    bibliography: JSON.stringify([
      { title: "Linear Algebra Done Right", author: "Sheldon Axler", level: "intermediate" },
      { title: "Introduction to Linear Algebra", author: "Gilbert Strang", level: "intro" },
      { title: "Linear Algebra", author: "Friedberg, Insel, Spence", level: "intermediate" },
      { title: "Advanced Linear Algebra", author: "Steven Roman", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 16 — Associative rings and algebras
  {
    id: "associative-rings",
    title: "Associative Rings & Algebras",
    description: "Noncommutative ring theory, modules over rings, and representation-theoretic structures.",
    author: "MathGraph Team",
    color: "#6d28d9",
    icon: "layers",
    code: "MSC 16",
    category: "Algebra",
    motivation:
      "When commutativity fails, new phenomena emerge: matrices, operator algebras, and group rings all live here. Noncommutative ring theory provides the algebraic infrastructure for representation theory and is essential for understanding quantum groups and noncommutative geometry.",
    bibliography: JSON.stringify([
      { title: "A First Course in Noncommutative Rings", author: "T.Y. Lam", level: "intermediate" },
      { title: "Noncommutative Algebra", author: "Benson Farb, R. Keith Dennis", level: "advanced" },
      { title: "Introductory Lectures on Rings and Modules", author: "John A. Beachy", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 17 — Nonassociative rings and algebras
  {
    id: "nonassociative-algebras",
    title: "Nonassociative Algebras",
    description: "Lie algebras, Jordan algebras, and other algebraic structures where associativity does not hold.",
    author: "MathGraph Team",
    color: "#5b21b6",
    icon: "star",
    code: "MSC 17",
    category: "Algebra",
    motivation:
      "Lie algebras are the infinitesimal shadows of symmetry groups, and they appear throughout physics and geometry. Nonassociative structures like Jordan algebras also arise naturally in quantum mechanics. This area sits at a powerful crossroads of algebra, geometry, and mathematical physics.",
    bibliography: JSON.stringify([
      { title: "Introduction to Lie Algebras and Representation Theory", author: "James E. Humphreys", level: "intermediate" },
      { title: "Lie Algebras of Finite and Affine Type", author: "Roger Carter", level: "advanced" },
      { title: "Semi-Simple Lie Algebras and Their Representations", author: "Robert N. Cahn", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 18 — Category theory; homological algebra
  {
    id: "category-theory",
    title: "Category Theory",
    description: "The abstract study of mathematical structures and relationships between them via objects and morphisms.",
    author: "MathGraph Team",
    color: "#4338ca",
    icon: "network",
    code: "MSC 18",
    category: "Algebra",
    motivation:
      "Category theory is sometimes called 'the mathematics of mathematics' — it provides a universal language for describing structure-preserving maps across all of algebra, topology, logic, and computer science. Once you see through categorical eyes, connections between seemingly unrelated fields become transparent.",
    bibliography: JSON.stringify([
      { title: "Category Theory in Context", author: "Emily Riehl", level: "intermediate" },
      { title: "Categories for the Working Mathematician", author: "Saunders Mac Lane", level: "advanced" },
      { title: "Conceptual Mathematics", author: "F. William Lawvere, Stephen H. Schanuel", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 19 — K-theory
  {
    id: "k-theory",
    title: "K-Theory",
    description: "Algebraic and topological K-theory: classifying vector bundles and projective modules via stable equivalence.",
    author: "MathGraph Team",
    color: "#3730a3",
    icon: "layers",
    code: "MSC 19",
    category: "Algebra",
    motivation:
      "K-theory began as a way to classify vector bundles in topology but has grown into a unifying force connecting algebra, geometry, number theory, and even physics. The Atiyah-Singer index theorem and the Quillen-Lichtenbaum conjecture both live in its domain. It is deep, modern, and extraordinarily powerful.",
    bibliography: JSON.stringify([
      { title: "K-Theory: An Introduction", author: "Max Karoubi", level: "intermediate" },
      { title: "The K-Book", author: "Charles A. Weibel", level: "advanced" },
      { title: "Vector Bundles and K-Theory", author: "Allen Hatcher", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 20 — Group theory and generalizations
  {
    id: "group-theory",
    title: "Group Theory",
    description: "The study of symmetry through groups: finite groups, permutation groups, and their representations.",
    author: "MathGraph Team",
    color: "#6366f1",
    icon: "star",
    code: "MSC 20",
    category: "Algebra",
    motivation:
      "Groups capture the essence of symmetry — whether it is the symmetry of a crystal, a differential equation, or a fundamental particle. The classification of finite simple groups stands as one of the greatest collaborative achievements in mathematics. Group theory is the backbone of modern algebra and an essential tool across all of science.",
    bibliography: JSON.stringify([
      { title: "An Introduction to the Theory of Groups", author: "Joseph J. Rotman", level: "intermediate" },
      { title: "Abstract Algebra", author: "David S. Dummit, Richard M. Foote", level: "advanced" },
      { title: "Visual Group Theory", author: "Nathan Carter", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 22 — Topological groups, Lie groups
  {
    id: "topological-groups",
    title: "Topological & Lie Groups",
    description: "Groups equipped with continuous or smooth structure: Lie groups, Lie algebras, and harmonic analysis.",
    author: "MathGraph Team",
    color: "#4f46e5",
    icon: "circle",
    code: "MSC 22",
    category: "Algebra",
    motivation:
      "Lie groups are the mathematical expression of continuous symmetry — rotations, translations, Lorentz transformations. They are the central objects of modern physics and differential geometry. Understanding their structure through Lie algebras and representation theory unlocks the deepest patterns in both mathematics and nature.",
    bibliography: JSON.stringify([
      { title: "Lie Groups, Lie Algebras, and Representations", author: "Brian C. Hall", level: "intermediate" },
      { title: "Representation Theory", author: "William Fulton, Joe Harris", level: "advanced" },
      { title: "Naive Lie Theory", author: "John Stillwell", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ── Analysis (MSC 26, 28, 30, 31, 32, 33, 34, 35, 37, 39, 40, 41, 42, 43, 44, 45, 46, 47, 49)
  // ═══════════════════════════════════════════════════════════════════════

  // MSC 26 — Real functions
  {
    id: "real-analysis",
    title: "Real Analysis",
    description: "Rigorous foundations of calculus: limits, continuity, differentiation, and integration on the real line.",
    author: "MathGraph Team",
    color: "#3b82f6",
    icon: "function",
    code: "MSC 26",
    category: "Analysis",
    motivation:
      "You used limits and derivatives in calculus, but did you ever truly understand why they work? Real analysis rebuilds the entire edifice from the ground up, with absolute logical precision. It is a rite of passage that transforms a student who computes into a mathematician who proves.",
    bibliography: JSON.stringify([
      { title: "Principles of Mathematical Analysis", author: "Walter Rudin", level: "intermediate" },
      { title: "Understanding Analysis", author: "Stephen Abbott", level: "intro" },
      { title: "Real Analysis: Modern Techniques and Their Applications", author: "Gerald B. Folland", level: "advanced" },
      { title: "Analysis I", author: "Terence Tao", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 28 — Measure and integration
  {
    id: "measure-theory",
    title: "Measure & Integration",
    description: "Lebesgue measure, abstract measure spaces, and the modern theory of integration.",
    author: "MathGraph Team",
    color: "#2563eb",
    icon: "function",
    code: "MSC 28",
    category: "Analysis",
    motivation:
      "The Riemann integral taught in calculus is elegant but limited. Measure theory replaces it with the far more powerful Lebesgue integral, opening the door to modern probability, functional analysis, and ergodic theory. It is the indispensable foundation for any advanced work in analysis.",
    bibliography: JSON.stringify([
      { title: "Measure Theory", author: "Paul R. Halmos", level: "intermediate" },
      { title: "Real Analysis: Modern Techniques and Their Applications", author: "Gerald B. Folland", level: "advanced" },
      { title: "Measure, Integration & Real Analysis", author: "Sheldon Axler", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 30 — Functions of a complex variable
  {
    id: "complex-analysis",
    title: "Complex Analysis",
    description: "Analysis of functions of a complex variable, including contour integration and conformal mappings.",
    author: "MathGraph Team",
    color: "#60a5fa",
    icon: "compass",
    code: "MSC 30",
    category: "Analysis",
    motivation:
      "Complex analysis is often called the most beautiful branch of mathematics, and for good reason. The moment you allow the square root of minus one, calculus becomes almost miraculously well-behaved: differentiable once means differentiable infinitely many times, and integrals around closed loops unlock deep number-theoretic secrets. Prepare to be astonished.",
    bibliography: JSON.stringify([
      { title: "Visual Complex Analysis", author: "Tristan Needham", level: "intro" },
      { title: "Complex Analysis", author: "Lars Ahlfors", level: "intermediate" },
      { title: "Functions of One Complex Variable", author: "John B. Conway", level: "intermediate" },
      { title: "Complex Analysis", author: "Elias M. Stein, Rami Shakarchi", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 31 — Potential theory
  {
    id: "potential-theory",
    title: "Potential Theory",
    description: "Harmonic and subharmonic functions, capacity, and the Dirichlet problem in classical and abstract settings.",
    author: "MathGraph Team",
    color: "#93c5fd",
    icon: "function",
    code: "MSC 31",
    category: "Analysis",
    motivation:
      "Potential theory studies harmonic functions — solutions to Laplace's equation — which appear everywhere from electrostatics to probability. It provides deep connections between analysis, geometry, and physics, and is the classical root of much modern PDE theory.",
    bibliography: JSON.stringify([
      { title: "Classical Potential Theory", author: "David H. Armitage, Stephen J. Gardiner", level: "advanced" },
      { title: "Potential Theory", author: "Lester L. Helms", level: "intermediate" },
      { title: "Subharmonic Functions", author: "Walter K. Hayman, Patrick B. Kennedy", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 32 — Several complex variables and analytic spaces
  {
    id: "several-complex-variables",
    title: "Several Complex Variables",
    description: "Function theory in multiple complex dimensions: domains of holomorphy, sheaves, and analytic spaces.",
    author: "MathGraph Team",
    color: "#38bdf8",
    icon: "compass",
    code: "MSC 32",
    category: "Analysis",
    motivation:
      "Moving from one complex variable to several reveals dramatic new phenomena: the Hartogs extension theorem shows that isolated singularities simply cannot exist in higher dimensions. Several complex variables lies at the interface of analysis, algebraic geometry, and differential geometry, with deep applications to string theory.",
    bibliography: JSON.stringify([
      { title: "Function Theory of Several Complex Variables", author: "Steven G. Krantz", level: "intermediate" },
      { title: "Analytic Functions of Several Complex Variables", author: "Robert C. Gunning, Hugo Rossi", level: "advanced" },
      { title: "From Holomorphic Functions to Complex Manifolds", author: "Klaus Fritzsche, Hans Grauert", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 33 — Special functions
  {
    id: "special-functions",
    title: "Special Functions",
    description: "Classical and modern special functions: Bessel, hypergeometric, orthogonal polynomials, and their properties.",
    author: "MathGraph Team",
    color: "#7dd3fc",
    icon: "function",
    code: "MSC 33",
    category: "Analysis",
    motivation:
      "Special functions are the aristocrats of analysis — they appear whenever you solve a differential equation with symmetry. Bessel functions describe vibrating drums, Legendre polynomials expand gravitational potentials, and the gamma function generalizes the factorial. They form an essential toolkit for applied mathematics and physics.",
    bibliography: JSON.stringify([
      { title: "Special Functions", author: "George E. Andrews, Richard Askey, Ranjan Roy", level: "advanced" },
      { title: "A Course of Modern Analysis", author: "E.T. Whittaker, G.N. Watson", level: "advanced" },
      { title: "Special Functions and Their Applications", author: "N.N. Lebedev", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 34 — Ordinary differential equations
  {
    id: "ode",
    title: "Ordinary Differential Equations",
    description: "Equations involving functions of one variable and their derivatives, modeling change over time.",
    author: "MathGraph Team",
    color: "#0ea5e9",
    icon: "function",
    code: "MSC 34",
    category: "Analysis",
    motivation:
      "Ordinary differential equations are the mathematical language of change. Population growth, radioactive decay, the motion of planets, the oscillation of springs — all are governed by ODEs. Learning to solve and analyze them gives you superpowers for modeling the real world, from biology to engineering to economics.",
    bibliography: JSON.stringify([
      { title: "Ordinary Differential Equations", author: "Morris Tenenbaum, Harry Pollard", level: "intro" },
      { title: "Ordinary Differential Equations", author: "Vladimir I. Arnold", level: "intermediate" },
      { title: "Nonlinear Dynamics and Chaos", author: "Steven H. Strogatz", level: "intermediate" },
      { title: "Differential Equations and Dynamical Systems", author: "Lawrence Perko", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 35 — Partial differential equations
  {
    id: "pde",
    title: "Partial Differential Equations",
    description: "Equations involving multivariable functions and their partial derivatives, describing heat, waves, and flow.",
    author: "MathGraph Team",
    color: "#0284c7",
    icon: "infinity",
    code: "MSC 35",
    category: "Analysis",
    motivation:
      "If ODEs model change in one dimension, PDEs model change across space and time simultaneously. The heat equation, the wave equation, the Navier-Stokes equations of fluid dynamics — these are all PDEs. Mastering them places you at the frontier where pure mathematics meets physics and engineering head-on.",
    bibliography: JSON.stringify([
      { title: "Partial Differential Equations: An Introduction", author: "Walter A. Strauss", level: "intro" },
      { title: "Partial Differential Equations", author: "Lawrence C. Evans", level: "advanced" },
      { title: "Partial Differential Equations in Action", author: "Sandro Salsa", level: "intermediate" },
      { title: "Applied Partial Differential Equations", author: "Richard Haberman", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 37 — Dynamical systems and ergodic theory
  {
    id: "dynamical-systems",
    title: "Dynamical Systems & Ergodic Theory",
    description: "Long-term behavior of evolving systems, chaos, attractors, and statistical properties of orbits.",
    author: "MathGraph Team",
    color: "#0369a1",
    icon: "infinity",
    code: "MSC 37",
    category: "Analysis",
    motivation:
      "Dynamical systems theory studies how systems evolve over time — from planetary orbits to weather patterns to population dynamics. Ergodic theory adds a probabilistic lens, asking: if you watch a system long enough, does it visit every possible state? The interplay of chaos and order here is both mathematically deep and visually stunning.",
    bibliography: JSON.stringify([
      { title: "Nonlinear Dynamics and Chaos", author: "Steven H. Strogatz", level: "intermediate" },
      { title: "Introduction to Dynamical Systems", author: "Michael Brin, Garrett Stuck", level: "intermediate" },
      { title: "Ergodic Theory", author: "Karl Petersen", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 39 — Difference and functional equations
  {
    id: "difference-equations",
    title: "Difference & Functional Equations",
    description: "Equations involving shifts, differences, and unknown functions — the discrete counterpart of differential equations.",
    author: "MathGraph Team",
    color: "#075985",
    icon: "function",
    code: "MSC 39",
    category: "Analysis",
    motivation:
      "Difference equations are the discrete siblings of differential equations: they govern recurrences, numerical methods, and discrete dynamical systems. Functional equations, like Cauchy's equation, ask what functions satisfy a given algebraic identity. Both appear constantly in competition mathematics and in applied modeling.",
    bibliography: JSON.stringify([
      { title: "An Introduction to Difference Equations", author: "Saber Elaydi", level: "intermediate" },
      { title: "Functional Equations and How to Solve Them", author: "Christopher G. Small", level: "intermediate" },
      { title: "Lectures on Functional Equations and Their Applications", author: "J. Aczél", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 40 — Sequences, series, summability
  {
    id: "sequences-series",
    title: "Sequences, Series & Summability",
    description: "Convergence and divergence of sequences and series, summability methods, and asymptotic analysis.",
    author: "MathGraph Team",
    color: "#0c4a6e",
    icon: "function",
    code: "MSC 40",
    category: "Analysis",
    motivation:
      "Series are among the oldest and most versatile tools in analysis — from Taylor and Fourier series to divergent series tamed by clever summability methods. Understanding when and how a series converges is essential for both pure analysis and practical computation.",
    bibliography: JSON.stringify([
      { title: "Infinite Series", author: "James M. Hyslop", level: "intro" },
      { title: "Divergent Series", author: "G.H. Hardy", level: "advanced" },
      { title: "Real Infinite Series", author: "Daniel D. Bonar, Michael J. Khoury", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 41 — Approximations and expansions
  {
    id: "approximation-theory",
    title: "Approximation Theory",
    description: "How well can functions be approximated by simpler ones? Polynomial, rational, and spline approximations.",
    author: "MathGraph Team",
    color: "#1e40af",
    icon: "function",
    code: "MSC 41",
    category: "Analysis",
    motivation:
      "Almost no function arising in practice can be computed exactly — we must approximate. Approximation theory provides the rigorous framework: Weierstrass's theorem, Chebyshev polynomials, best approximation in various norms. It underpins numerical analysis, signal processing, and machine learning.",
    bibliography: JSON.stringify([
      { title: "Approximation Theory and Approximation Practice", author: "Lloyd N. Trefethen", level: "intermediate" },
      { title: "Chebyshev and Fourier Spectral Methods", author: "John P. Boyd", level: "advanced" },
      { title: "A Course in Approximation Theory", author: "Ward Cheney, Will Light", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 42 — Harmonic analysis on Euclidean spaces
  {
    id: "harmonic-analysis",
    title: "Harmonic Analysis",
    description: "Fourier analysis, wavelets, and the decomposition of functions into fundamental oscillatory components.",
    author: "MathGraph Team",
    color: "#1d4ed8",
    icon: "infinity",
    code: "MSC 42",
    category: "Analysis",
    motivation:
      "Fourier's revolutionary insight — that any reasonable function can be decomposed into sines and cosines — gave birth to harmonic analysis. It powers signal processing, quantum mechanics, number theory, and PDE theory. Wavelets extend these ideas to capture localized phenomena. This is analysis at its most applicable and beautiful.",
    bibliography: JSON.stringify([
      { title: "Fourier Analysis", author: "Elias M. Stein, Rami Shakarchi", level: "intermediate" },
      { title: "Classical Fourier Analysis", author: "Loukas Grafakos", level: "advanced" },
      { title: "An Introduction to Harmonic Analysis", author: "Yitzhak Katznelson", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 43 — Abstract harmonic analysis
  {
    id: "abstract-harmonic-analysis",
    title: "Abstract Harmonic Analysis",
    description: "Harmonic analysis on locally compact groups: Haar measure, Pontryagin duality, and representation theory.",
    author: "MathGraph Team",
    color: "#2563eb",
    icon: "infinity",
    code: "MSC 43",
    category: "Analysis",
    motivation:
      "Abstract harmonic analysis generalizes Fourier analysis from the real line to arbitrary locally compact groups. Pontryagin duality reveals that every such group has a 'dual' group, and the Fourier transform mediates between the two. This framework unifies number theory, representation theory, and signal processing on non-Euclidean domains.",
    bibliography: JSON.stringify([
      { title: "A Course in Abstract Harmonic Analysis", author: "Gerald B. Folland", level: "advanced" },
      { title: "Fourier Analysis on Groups", author: "Walter Rudin", level: "advanced" },
      { title: "Principles of Harmonic Analysis", author: "Anton Deitmar, Siegfried Echterhoff", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 44 — Integral transforms, operational calculus
  {
    id: "integral-transforms",
    title: "Integral Transforms",
    description: "Laplace, Fourier, Mellin, and other integral transforms as tools for solving equations and analyzing signals.",
    author: "MathGraph Team",
    color: "#3b82f6",
    icon: "function",
    code: "MSC 44",
    category: "Analysis",
    motivation:
      "Integral transforms convert difficult differential equations into manageable algebraic ones. The Laplace transform tames initial-value problems, the Fourier transform reveals frequency content, and the Mellin transform connects analysis to number theory. They are among the most powerful computational tools in applied mathematics.",
    bibliography: JSON.stringify([
      { title: "The Fourier Transform and Its Applications", author: "Ronald N. Bracewell", level: "intermediate" },
      { title: "Integral Transforms and Their Applications", author: "Lokenath Debnath, Dambaru Bhatta", level: "intermediate" },
      { title: "Tables of Integral Transforms", author: "A. Erdélyi et al.", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 45 — Integral equations
  {
    id: "integral-equations",
    title: "Integral Equations",
    description: "Equations in which an unknown function appears under an integral sign: Fredholm, Volterra, and singular types.",
    author: "MathGraph Team",
    color: "#60a5fa",
    icon: "infinity",
    code: "MSC 45",
    category: "Analysis",
    motivation:
      "Integral equations arise naturally when boundary-value problems are reformulated or when the output of a system depends on its entire history. Fredholm and Volterra equations form the core, with deep connections to functional analysis and operator theory. They are indispensable in scattering theory, elasticity, and signal processing.",
    bibliography: JSON.stringify([
      { title: "Integral Equations", author: "F.G. Tricomi", level: "intermediate" },
      { title: "Linear Integral Equations", author: "Rainer Kress", level: "advanced" },
      { title: "A First Course in Integral Equations", author: "Abdul-Majid Wazwaz", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 46 — Functional analysis
  {
    id: "functional-analysis",
    title: "Functional Analysis",
    description: "Infinite-dimensional vector spaces, operators, and the analytic backbone of modern physics.",
    author: "MathGraph Team",
    color: "#38bdf8",
    icon: "infinity",
    code: "MSC 46",
    category: "Analysis",
    motivation:
      "What happens when linear algebra meets analysis in infinite dimensions? You get functional analysis — the framework that makes quantum mechanics rigorous, that powers the modern theory of PDEs, and that provides the abstract setting for signal processing. If you want to do serious applied or pure mathematics, this is indispensable.",
    bibliography: JSON.stringify([
      { title: "Introductory Functional Analysis with Applications", author: "Erwin Kreyszig", level: "intro" },
      { title: "Functional Analysis", author: "Walter Rudin", level: "advanced" },
      { title: "Functional Analysis, Sobolev Spaces and Partial Differential Equations", author: "Haim Brezis", level: "advanced" },
      { title: "A Course in Functional Analysis", author: "John B. Conway", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 47 — Operator theory
  {
    id: "operator-theory",
    title: "Operator Theory",
    description: "Spectral theory, bounded and unbounded operators on Hilbert and Banach spaces.",
    author: "MathGraph Team",
    color: "#0ea5e9",
    icon: "infinity",
    code: "MSC 47",
    category: "Analysis",
    motivation:
      "Operators are the protagonists of functional analysis: the spectral theorem generalizes eigenvalue decomposition to infinite dimensions, and unbounded operators model quantum observables. Operator theory provides the precise language for everything from quantum mechanics to control theory.",
    bibliography: JSON.stringify([
      { title: "A Hilbert Space Problem Book", author: "Paul R. Halmos", level: "intermediate" },
      { title: "Perturbation Theory for Linear Operators", author: "Tosio Kato", level: "advanced" },
      { title: "An Introduction to Operators on the Hardy-Hilbert Space", author: "Ruben A. Martinez-Avendano, Peter Rosenthal", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 49 — Calculus of variations and optimal control
  {
    id: "calculus-of-variations",
    title: "Calculus of Variations",
    description: "Optimizing functionals: finding curves, surfaces, or functions that minimize energy, area, or action.",
    author: "MathGraph Team",
    color: "#0284c7",
    icon: "function",
    code: "MSC 49",
    category: "Analysis",
    motivation:
      "What shape of wire encloses the maximum area? What path minimizes travel time through a varying medium? The calculus of variations answers these optimization questions over function spaces. It gave rise to the Euler-Lagrange equations, the principle of least action in physics, and modern optimal control theory.",
    bibliography: JSON.stringify([
      { title: "Calculus of Variations", author: "I.M. Gelfand, S.V. Fomin", level: "intermediate" },
      { title: "Introduction to the Calculus of Variations", author: "Hans Sagan", level: "intermediate" },
      { title: "Optimal Control Theory", author: "Donald E. Kirk", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ── Geometry & Topology (MSC 51, 52, 53, 54, 55, 57, 58) ─────────────
  // ═══════════════════════════════════════════════════════════════════════

  // MSC 51 — Geometry
  {
    id: "euclidean-geometry",
    title: "Euclidean & Projective Geometry",
    description: "Classical geometry of points, lines, circles, and transformations in the plane and space.",
    author: "MathGraph Team",
    color: "#10b981",
    icon: "compass",
    code: "MSC 51",
    category: "Geometry & Topology",
    motivation:
      "Euclidean geometry is where mathematical proof was born — two thousand years ago, with Euclid's Elements. Far from being an outdated relic, it trains your geometric intuition and your ability to reason rigorously from axioms. Many competition problems and modern results still trace their roots back to the elegance of classical geometry.",
    bibliography: JSON.stringify([
      { title: "Euclidean Geometry in Mathematical Olympiads", author: "Evan Chen", level: "intermediate" },
      { title: "Geometry Revisited", author: "H.S.M. Coxeter, S.L. Greitzer", level: "intermediate" },
      { title: "The Four Pillars of Geometry", author: "John Stillwell", level: "intro" },
      { title: "Euclid's Elements", author: "Euclid (translated by T.L. Heath)", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 52 — Convex and discrete geometry
  {
    id: "convex-geometry",
    title: "Convex & Discrete Geometry",
    description: "Convex bodies, polytopes, packings, tilings, and the combinatorial geometry of discrete structures.",
    author: "MathGraph Team",
    color: "#34d399",
    icon: "compass",
    code: "MSC 52",
    category: "Geometry & Topology",
    motivation:
      "From the shape of crystals to the optimal packing of oranges, convex and discrete geometry studies the combinatorial and metric properties of geometric objects. Polytopes, Voronoi diagrams, and Minkowski sums are essential in optimization, computational geometry, and modern data science.",
    bibliography: JSON.stringify([
      { title: "Convex Bodies: The Brunn-Minkowski Theory", author: "Rolf Schneider", level: "advanced" },
      { title: "Lectures on Polytopes", author: "Günter M. Ziegler", level: "intermediate" },
      { title: "Combinatorial Geometry", author: "János Pach, Pankaj K. Agarwal", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 53 — Differential geometry
  {
    id: "differential-geometry",
    title: "Differential Geometry",
    description: "Geometry of curves, surfaces, and manifolds studied through calculus and linear algebra.",
    author: "MathGraph Team",
    color: "#2dd4bf",
    icon: "compass",
    code: "MSC 53",
    category: "Geometry & Topology",
    motivation:
      "Differential geometry is the language of general relativity and gauge theory — it is how we describe the curvature of spacetime itself. But even beyond physics, it offers a gorgeous synthesis of analysis, algebra, and geometry. Learning to think on curved spaces will permanently change how you see the mathematical world.",
    bibliography: JSON.stringify([
      { title: "Differential Geometry of Curves and Surfaces", author: "Manfredo P. do Carmo", level: "intro" },
      { title: "Introduction to Smooth Manifolds", author: "John M. Lee", level: "intermediate" },
      { title: "Riemannian Geometry", author: "Manfredo P. do Carmo", level: "advanced" },
      { title: "Visual Differential Geometry and Forms", author: "Tristan Needham", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 54 — General topology
  {
    id: "topology",
    title: "General Topology",
    description: "The study of spatial properties preserved under continuous deformations: open sets, compactness, connectedness.",
    author: "MathGraph Team",
    color: "#14b8a6",
    icon: "circle",
    code: "MSC 54",
    category: "Geometry & Topology",
    motivation:
      "Topology asks the question: what properties of a shape survive when you stretch and bend it, but never tear or glue? This deceptively simple idea leads to some of the deepest mathematics of the 20th century. From classifying surfaces to understanding the shape of the universe, topology gives you eyes to see structure that geometry alone cannot reveal.",
    bibliography: JSON.stringify([
      { title: "Topology", author: "James R. Munkres", level: "intermediate" },
      { title: "Introduction to Topological Manifolds", author: "John M. Lee", level: "intermediate" },
      { title: "Algebraic Topology", author: "Allen Hatcher", level: "advanced" },
      { title: "Topology: A Very Short Introduction", author: "Richard Earl", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 55 — Algebraic topology
  {
    id: "algebraic-topology",
    title: "Algebraic Topology",
    description: "Using algebraic invariants — homotopy groups, homology, cohomology — to classify topological spaces.",
    author: "MathGraph Team",
    color: "#0d9488",
    icon: "network",
    code: "MSC 55",
    category: "Geometry & Topology",
    motivation:
      "Algebraic topology assigns algebraic objects like groups and rings to topological spaces, converting geometric questions into algebraic ones that can be computed. The fundamental group, homology, and cohomology are its main tools. They prove, for instance, that you cannot comb a hairy ball flat or turn a sphere inside out without creasing.",
    bibliography: JSON.stringify([
      { title: "Algebraic Topology", author: "Allen Hatcher", level: "intermediate" },
      { title: "A Concise Course in Algebraic Topology", author: "J. Peter May", level: "advanced" },
      { title: "Topology and Geometry", author: "Glen E. Bredon", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 57 — Manifolds and cell complexes
  {
    id: "manifolds",
    title: "Manifolds & Cell Complexes",
    description: "The topology and geometry of manifolds: surgery theory, cobordism, handle decompositions, and exotic structures.",
    author: "MathGraph Team",
    color: "#059669",
    icon: "circle",
    code: "MSC 57",
    category: "Geometry & Topology",
    motivation:
      "Manifolds are the higher-dimensional generalizations of curves and surfaces — the natural stage for physics and geometry. This area studies their classification, asking when two manifolds are 'the same' and discovering exotic phenomena like the 28 distinct smooth structures on the 7-sphere. It is where topology meets its most spectacular results.",
    bibliography: JSON.stringify([
      { title: "Introduction to Topological Manifolds", author: "John M. Lee", level: "intermediate" },
      { title: "Topology from the Differentiable Viewpoint", author: "John W. Milnor", level: "intermediate" },
      { title: "Differential Topology", author: "Victor Guillemin, Alan Pollack", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 58 — Global analysis, analysis on manifolds
  {
    id: "global-analysis",
    title: "Global Analysis on Manifolds",
    description: "Differential equations, variational problems, and index theory on smooth manifolds.",
    author: "MathGraph Team",
    color: "#047857",
    icon: "infinity",
    code: "MSC 58",
    category: "Geometry & Topology",
    motivation:
      "Global analysis brings the tools of calculus and functional analysis to bear on manifolds, yielding results like the Atiyah-Singer index theorem that link topology to analysis in breathtaking ways. Morse theory, de Rham cohomology, and the study of geodesics all live here — at the deepest intersection of geometry and analysis.",
    bibliography: JSON.stringify([
      { title: "Morse Theory", author: "John W. Milnor", level: "intermediate" },
      { title: "Geometry of Differential Forms", author: "Shigeyuki Morita", level: "intermediate" },
      { title: "Spin Geometry", author: "H. Blaine Lawson, Marie-Louise Michelsohn", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ── Applied Math & Computation (MSC 65, 68, 93, 94) ───────────────────
  // ═══════════════════════════════════════════════════════════════════════

  // MSC 65 — Numerical analysis
  {
    id: "numerical-analysis",
    title: "Numerical Analysis",
    description: "Algorithms for approximating solutions to mathematical problems: interpolation, quadrature, and linear solvers.",
    author: "MathGraph Team",
    color: "#22d3ee",
    icon: "cpu",
    code: "MSC 65",
    category: "Applied Math & Computation",
    motivation:
      "Most real-world mathematical problems cannot be solved exactly — they must be approximated numerically. Numerical analysis provides the algorithms and error bounds that make scientific computing reliable. From weather prediction to finite element analysis, this is the bridge between mathematical theory and practical computation.",
    bibliography: JSON.stringify([
      { title: "Numerical Analysis", author: "Richard L. Burden, J. Douglas Faires", level: "intermediate" },
      { title: "Numerical Linear Algebra", author: "Lloyd N. Trefethen, David Bau III", level: "intermediate" },
      { title: "An Introduction to Numerical Analysis", author: "Endre Süli, David F. Mayers", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 68 — Computer science
  {
    id: "theory-of-computation",
    title: "Theory of Computation",
    description: "Formal languages, automata, computability, and the fundamental limits of what machines can compute.",
    author: "MathGraph Team",
    color: "#06b6d4",
    icon: "cpu",
    code: "MSC 68",
    category: "Applied Math & Computation",
    motivation:
      "What can a computer actually compute? Are there problems no algorithm can ever solve? The theory of computation answers these questions with mathematical precision, drawing on logic, algebra, and combinatorics. Understanding Turing machines, NP-completeness, and formal languages is essential for anyone who wants to grasp the true power — and limits — of computation.",
    bibliography: JSON.stringify([
      { title: "Introduction to the Theory of Computation", author: "Michael Sipser", level: "intro" },
      { title: "Computational Complexity: A Modern Approach", author: "Sanjeev Arora, Boaz Barak", level: "advanced" },
      { title: "Introduction to Automata Theory, Languages, and Computation", author: "John E. Hopcroft, Jeffrey D. Ullman", level: "intermediate" },
      { title: "The Annotated Turing", author: "Charles Petzold", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },
  {
    id: "using-lean",
    title: "Using Lean",
    description: "Introduction to the Lean proof assistant for formalizing and verifying mathematical proofs.",
    author: "MathGraph Team",
    color: "#0891b2",
    icon: "cpu",
    code: "MSC 68",
    category: "Applied Math & Computation",
    motivation:
      "Lean is a revolutionary proof assistant that lets you write mathematics a computer can verify, line by line. In an era where AI and formal verification are transforming how we do mathematics, learning Lean puts you at the cutting edge. It also deepens your understanding of logic and proof structure in a way that pen-and-paper work alone never can.",
    bibliography: JSON.stringify([
      { title: "Theorem Proving in Lean 4", author: "Jeremy Avigad et al.", level: "intro" },
      { title: "Mathematics in Lean", author: "Jeremy Avigad, Patrick Massot", level: "intermediate" },
      { title: "Functional Programming in Lean", author: "David Thrane Christiansen", level: "intermediate" },
      { title: "The Mechanics of Proof", author: "Heather Macbeth", level: "intro" },
    ]),
    isMeta: true,
    posX: 0,
    posY: 0,
  },

  // MSC 93 — Systems theory; control
  {
    id: "systems-control",
    title: "Systems Theory & Control",
    description: "Mathematical modeling and control of dynamical systems: stability, feedback, observability, and optimal control.",
    author: "MathGraph Team",
    color: "#0e7490",
    icon: "cpu",
    code: "MSC 93",
    category: "Applied Math & Computation",
    motivation:
      "How do you steer a rocket, stabilize a power grid, or regulate a chemical process? Control theory provides the mathematical answer, using differential equations, linear algebra, and optimization to design systems that behave as desired. It is one of the most immediately impactful branches of applied mathematics.",
    bibliography: JSON.stringify([
      { title: "Linear Systems Theory", author: "João P. Hespanha", level: "intermediate" },
      { title: "Feedback Control of Dynamic Systems", author: "Gene F. Franklin et al.", level: "intermediate" },
      { title: "Mathematical Control Theory", author: "Eduardo D. Sontag", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 94 — Information and communication, circuits
  {
    id: "information-theory",
    title: "Information Theory",
    description: "The mathematical quantification of information, entropy, and the limits of data compression and transmission.",
    author: "MathGraph Team",
    color: "#155e75",
    icon: "cpu",
    code: "MSC 94",
    category: "Applied Math & Computation",
    motivation:
      "Claude Shannon single-handedly created information theory in 1948, and the world has never been the same. Every time you stream a video, send a text message, or compress a file, Shannon's theorems are at work. This module reveals the elegant mathematics behind communication, showing that information itself can be measured, bounded, and optimized.",
    bibliography: JSON.stringify([
      { title: "Elements of Information Theory", author: "Thomas M. Cover, Joy A. Thomas", level: "intermediate" },
      { title: "Information Theory, Inference and Learning Algorithms", author: "David J.C. MacKay", level: "intermediate" },
      { title: "A Mathematical Theory of Communication", author: "Claude E. Shannon", level: "advanced" },
      { title: "Information: A Very Short Introduction", author: "Luciano Floridi", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ── Probability, Statistics & Decision Sciences (MSC 60, 62, 90, 91, 92)
  // ═══════════════════════════════════════════════════════════════════════

  // MSC 60 — Probability theory and stochastic processes
  {
    id: "probability",
    title: "Probability Theory",
    description: "The rigorous mathematical framework for quantifying uncertainty and random phenomena.",
    author: "MathGraph Team",
    color: "#4ade80",
    icon: "chart",
    code: "MSC 60",
    category: "Probability, Statistics & Decision Sciences",
    motivation:
      "Uncertainty is woven into the fabric of the world, and probability theory is our most powerful tool for reasoning about it. From the law of large numbers to martingales, from random walks to stochastic processes, probability provides the mathematical backbone for finance, machine learning, statistical physics, and far more. It is pure mathematics with immediate real-world bite.",
    bibliography: JSON.stringify([
      { title: "Probability and Random Processes", author: "Geoffrey Grimmett, David Stirzaker", level: "intermediate" },
      { title: "A First Course in Probability", author: "Sheldon Ross", level: "intro" },
      { title: "Probability: Theory and Examples", author: "Rick Durrett", level: "advanced" },
      { title: "Introduction to Probability Models", author: "Sheldon Ross", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 62 — Statistics
  {
    id: "statistics",
    title: "Statistics",
    description: "Methods for collecting, analyzing, and drawing conclusions from data under uncertainty.",
    author: "MathGraph Team",
    color: "#86efac",
    icon: "chart",
    code: "MSC 62",
    category: "Probability, Statistics & Decision Sciences",
    motivation:
      "In a world drowning in data, statistics is the discipline that teaches you to separate signal from noise. Hypothesis testing, regression, Bayesian inference — these are not just academic exercises, they are the tools that drive medical trials, public policy, and scientific discovery. Understanding statistics deeply means you will never be misled by a misleading graph again.",
    bibliography: JSON.stringify([
      { title: "All of Statistics", author: "Larry Wasserman", level: "intermediate" },
      { title: "Statistical Inference", author: "George Casella, Roger L. Berger", level: "advanced" },
      { title: "The Art of Statistics", author: "David Spiegelhalter", level: "intro" },
      { title: "Computer Age Statistical Inference", author: "Bradley Efron, Trevor Hastie", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 90 — Operations research, mathematical programming
  {
    id: "operations-research",
    title: "Operations Research",
    description: "Optimization techniques for decision-making: linear programming, scheduling, and resource allocation.",
    author: "MathGraph Team",
    color: "#22c55e",
    icon: "chart",
    code: "MSC 90",
    category: "Probability, Statistics & Decision Sciences",
    motivation:
      "Operations research is mathematics with its sleeves rolled up. It asks: given limited resources, how do you make the best possible decision? From scheduling airline crews to optimizing supply chains to planning military logistics, OR deploys linear programming, integer programming, and network optimization to solve problems that matter in the real world, right now.",
    bibliography: JSON.stringify([
      { title: "Introduction to Linear Optimization", author: "Dimitris Bertsimas, John N. Tsitsiklis", level: "intermediate" },
      { title: "Operations Research: Applications and Algorithms", author: "Wayne L. Winston", level: "intro" },
      { title: "Convex Optimization", author: "Stephen Boyd, Lieven Vandenberghe", level: "advanced" },
      { title: "Integer Programming", author: "Laurence A. Wolsey", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 91 — Game theory, economics, social and behavioral sciences
  {
    id: "game-theory",
    title: "Game Theory",
    description: "Mathematical modeling of strategic interaction between rational decision-makers.",
    author: "MathGraph Team",
    color: "#16a34a",
    icon: "network",
    code: "MSC 91",
    category: "Probability, Statistics & Decision Sciences",
    motivation:
      "Whenever two or more agents make decisions that affect each other — in economics, politics, biology, or even everyday negotiations — game theory provides the mathematical framework to analyze the outcome. From Nash equilibria to auction design, this is the mathematics of strategy, conflict, and cooperation. It won John Nash a Nobel Prize, and it will change how you see every human interaction.",
    bibliography: JSON.stringify([
      { title: "Game Theory: An Introduction", author: "Steven Tadelis", level: "intro" },
      { title: "A Course in Game Theory", author: "Martin J. Osborne, Ariel Rubinstein", level: "intermediate" },
      { title: "Algorithmic Game Theory", author: "Noam Nisan et al.", level: "advanced" },
      { title: "The Joy of Game Theory", author: "Presh Talwalkar", level: "intro" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 92 — Biology and other natural sciences
  {
    id: "mathematical-biology",
    title: "Mathematical Biology",
    description: "Mathematical modeling of biological systems: population dynamics, epidemiology, genetics, and ecology.",
    author: "MathGraph Team",
    color: "#15803d",
    icon: "network",
    code: "MSC 92",
    category: "Probability, Statistics & Decision Sciences",
    motivation:
      "From predator-prey models to the spread of epidemics, from the folding of proteins to the branching of blood vessels, mathematics provides the language to describe and predict biological phenomena. Mathematical biology is one of the fastest-growing fields at the intersection of quantitative and life sciences.",
    bibliography: JSON.stringify([
      { title: "Mathematical Biology", author: "James D. Murray", level: "intermediate" },
      { title: "An Introduction to Mathematical Ecology", author: "E.C. Pielou", level: "intro" },
      { title: "Modeling Life", author: "Alan Garfinkel, Jane Shevtsov, Yina Guo", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ── Mathematical Physics (MSC 70, 74, 76, 78, 80, 81, 82, 83, 85, 86)
  // ═══════════════════════════════════════════════════════════════════════

  // MSC 70 — Mechanics of particles and systems
  {
    id: "mathematical-physics",
    title: "Classical Mechanics",
    description: "The rigorous mathematical frameworks underlying physical theories, from Newtonian to Lagrangian and Hamiltonian mechanics.",
    author: "MathGraph Team",
    color: "#e879f9",
    icon: "star",
    code: "MSC 70",
    category: "Mathematical Physics",
    motivation:
      "Physics asks the questions; mathematics provides the answers — and often, the questions that physics didn't know to ask. Mathematical physics is the grand arena where geometry, analysis, and algebra converge to describe the fundamental laws of nature. From symplectic geometry in classical mechanics to operator algebras in quantum theory, this is applied mathematics at its most profound.",
    bibliography: JSON.stringify([
      { title: "Mathematical Methods of Classical Mechanics", author: "Vladimir I. Arnold", level: "intermediate" },
      { title: "The Road to Reality", author: "Roger Penrose", level: "advanced" },
      { title: "Mathematics of Classical and Quantum Physics", author: "Frederick W. Byron, Robert W. Fuller", level: "intermediate" },
      { title: "Topology, Geometry and Gauge Fields", author: "Gregory L. Naber", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 74 — Mechanics of deformable solids
  {
    id: "continuum-mechanics-solids",
    title: "Mechanics of Deformable Solids",
    description: "Elasticity, plasticity, fracture mechanics, and the mathematical theory of stress and strain in solid materials.",
    author: "MathGraph Team",
    color: "#d946ef",
    icon: "layers",
    code: "MSC 74",
    category: "Mathematical Physics",
    motivation:
      "Why do bridges stand and why do they sometimes fall? The mechanics of deformable solids uses PDEs and tensor calculus to model how solid materials respond to forces. Elasticity theory, developed by Cauchy and later refined by many, is essential for structural engineering, materials science, and geophysics.",
    bibliography: JSON.stringify([
      { title: "The Linearized Theory of Elasticity", author: "William S. Slaughter", level: "intermediate" },
      { title: "Mathematical Elasticity", author: "Philippe G. Ciarlet", level: "advanced" },
      { title: "Continuum Mechanics", author: "A.J.M. Spencer", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 76 — Fluid mechanics
  {
    id: "fluid-mechanics",
    title: "Fluid Mechanics",
    description: "The mathematics of fluid flow: Navier-Stokes equations, turbulence, compressible and incompressible flows.",
    author: "MathGraph Team",
    color: "#c026d3",
    icon: "infinity",
    code: "MSC 76",
    category: "Mathematical Physics",
    motivation:
      "The Navier-Stokes equations describing fluid flow are among the most important and most mysterious in all of mathematics — proving their regularity is a Millennium Prize Problem. Fluid mechanics combines PDEs, functional analysis, and computational methods to understand phenomena from ocean currents to blood flow to aerodynamics.",
    bibliography: JSON.stringify([
      { title: "An Introduction to Fluid Dynamics", author: "G.K. Batchelor", level: "intermediate" },
      { title: "Mathematical Theory of Incompressible Nonviscous Fluids", author: "Carlo Marchioro, Mario Pulvirenti", level: "advanced" },
      { title: "Fluid Mechanics", author: "Pijush K. Kundu, Ira M. Cohen", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 78 — Optics, electromagnetic theory
  {
    id: "electromagnetic-theory",
    title: "Optics & Electromagnetic Theory",
    description: "Maxwell's equations, wave propagation, diffraction, and the mathematical foundations of electromagnetism.",
    author: "MathGraph Team",
    color: "#a855f7",
    icon: "star",
    code: "MSC 78",
    category: "Mathematical Physics",
    motivation:
      "Maxwell's equations unified electricity, magnetism, and light in one of the greatest intellectual achievements in history. Their mathematical study involves PDEs, Fourier analysis, and functional analysis, and leads to applications in telecommunications, radar, photonics, and the very nature of light itself.",
    bibliography: JSON.stringify([
      { title: "Classical Electrodynamics", author: "John David Jackson", level: "advanced" },
      { title: "Introduction to Electrodynamics", author: "David J. Griffiths", level: "intermediate" },
      { title: "Principles of Optics", author: "Max Born, Emil Wolf", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 80 — Classical thermodynamics, heat transfer
  {
    id: "thermodynamics",
    title: "Classical Thermodynamics",
    description: "The mathematical theory of heat, energy, entropy, and the laws governing thermal processes.",
    author: "MathGraph Team",
    color: "#f472b6",
    icon: "function",
    code: "MSC 80",
    category: "Mathematical Physics",
    motivation:
      "Thermodynamics governs everything from steam engines to black holes. Its mathematical formulation through convex analysis, contact geometry, and PDEs reveals deep structural parallels with information theory. The second law of thermodynamics — entropy always increases — is arguably the most universal law in all of physics.",
    bibliography: JSON.stringify([
      { title: "Thermodynamics: An Engineering Approach", author: "Yunus A. Cengel, Michael A. Boles", level: "intermediate" },
      { title: "The Mathematical Structure of Thermodynamics", author: "Peter Salamon et al.", level: "advanced" },
      { title: "Elements of Classical Thermodynamics", author: "A.B. Pippard", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 81 — Quantum theory
  {
    id: "quantum-theory",
    title: "Quantum Theory",
    description: "The mathematical formalism of quantum mechanics: Hilbert spaces, operators, path integrals, and quantum information.",
    author: "MathGraph Team",
    color: "#fb7185",
    icon: "star",
    code: "MSC 81",
    category: "Mathematical Physics",
    motivation:
      "Quantum mechanics is the most successful physical theory ever devised, and its mathematical framework — Hilbert spaces, self-adjoint operators, and C*-algebras — is extraordinarily rich. From quantum computing to the standard model of particle physics, this is where the deepest questions about the nature of reality meet the most sophisticated mathematics.",
    bibliography: JSON.stringify([
      { title: "Quantum Mechanics and Path Integrals", author: "Richard P. Feynman, Albert R. Hibbs", level: "intermediate" },
      { title: "Mathematical Foundations of Quantum Mechanics", author: "John von Neumann", level: "advanced" },
      { title: "Quantum Theory for Mathematicians", author: "Brian C. Hall", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 82 — Statistical mechanics, structure of matter
  {
    id: "statistical-mechanics",
    title: "Statistical Mechanics",
    description: "Deriving macroscopic thermodynamic behavior from microscopic probabilistic laws governing particles.",
    author: "MathGraph Team",
    color: "#f9a8d4",
    icon: "chart",
    code: "MSC 82",
    category: "Mathematical Physics",
    motivation:
      "How do the random motions of trillions of atoms produce the orderly behavior we observe at human scales? Statistical mechanics bridges the microscopic and macroscopic worlds using probability, combinatorics, and analysis. Phase transitions, the Ising model, and Boltzmann's entropy formula are among its most celebrated results.",
    bibliography: JSON.stringify([
      { title: "Statistical Mechanics", author: "Kerson Huang", level: "intermediate" },
      { title: "Statistical Mechanics: Rigorous Results", author: "David Ruelle", level: "advanced" },
      { title: "Thermal Physics", author: "Charles Kittel, Herbert Kroemer", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 83 — Relativity and gravitational theory
  {
    id: "relativity",
    title: "Relativity & Gravitational Theory",
    description: "Special and general relativity: Lorentz geometry, Einstein's field equations, and the curvature of spacetime.",
    author: "MathGraph Team",
    color: "#fda4af",
    icon: "compass",
    code: "MSC 83",
    category: "Mathematical Physics",
    motivation:
      "Einstein's general relativity reimagines gravity as the curvature of spacetime, described by a system of nonlinear PDEs of breathtaking beauty. Its mathematical study requires differential geometry, tensor calculus, and global analysis. From black holes to gravitational waves, relativity remains one of the most mathematically rich physical theories.",
    bibliography: JSON.stringify([
      { title: "Spacetime and Geometry", author: "Sean M. Carroll", level: "intermediate" },
      { title: "General Relativity", author: "Robert M. Wald", level: "advanced" },
      { title: "A First Course in General Relativity", author: "Bernard F. Schutz", level: "intermediate" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 85 — Astronomy and astrophysics
  {
    id: "astronomy-astrophysics",
    title: "Astronomy & Astrophysics",
    description: "Mathematical models of celestial mechanics, stellar structure, cosmology, and gravitational dynamics.",
    author: "MathGraph Team",
    color: "#fb923c",
    icon: "star",
    code: "MSC 85",
    category: "Mathematical Physics",
    motivation:
      "From Kepler's laws to modern cosmology, astronomy has always been intertwined with mathematics. Celestial mechanics uses differential equations and perturbation theory, stellar structure relies on fluid dynamics and nuclear physics, and cosmology deploys general relativity on the largest scales. This is mathematics applied to the universe itself.",
    bibliography: JSON.stringify([
      { title: "An Introduction to Modern Astrophysics", author: "Bradley W. Carroll, Dale A. Ostlie", level: "intermediate" },
      { title: "Mathematical Methods of Classical Mechanics", author: "Vladimir I. Arnold", level: "intermediate" },
      { title: "Cosmology", author: "Steven Weinberg", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },

  // MSC 86 — Geophysics
  {
    id: "geophysics",
    title: "Geophysics",
    description: "Mathematical modeling of Earth processes: seismology, geodesy, geomagnetism, and climate dynamics.",
    author: "MathGraph Team",
    color: "#f97316",
    icon: "compass",
    code: "MSC 86",
    category: "Mathematical Physics",
    motivation:
      "How do we image the Earth's interior from seismic waves? How do we model the climate system or predict volcanic eruptions? Geophysics applies inverse problems, PDEs, and statistical methods to understand our planet. It is a rich source of challenging mathematical problems with direct societal impact.",
    bibliography: JSON.stringify([
      { title: "Geophysical Data Analysis", author: "William Menke", level: "intermediate" },
      { title: "An Introduction to Geophysical Exploration", author: "Philip Kearey, Michael Brooks, Ian Hill", level: "intermediate" },
      { title: "Inverse Problem Theory", author: "Albert Tarantola", level: "advanced" },
    ]),
    isMeta: false,
    posX: 0,
    posY: 0,
  },
];
