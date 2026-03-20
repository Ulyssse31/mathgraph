// Seed data for the 3 Analysis modules: Real Analysis, Complex Analysis, Functional Analysis.

interface NodeData {
  id: string;
  moduleId: string;
  code: string;
  title: string;
  description: string;
  nodeType: "core" | "history" | "example" | "application";
  isOptional: boolean;
  status: string;
  xp: number;
  posX: number;
  posY: number;
}

interface EdgeData {
  moduleId: string;
  sourceId: string;
  targetId: string;
  type: "prerequisite" | "soft" | "enrichment";
}

// ---------------------------------------------------------------------------
// Module 1: Real Analysis (ANA.1) — 25 nodes
// ---------------------------------------------------------------------------

export const ANALYSIS_NODES: NodeData[] = [
  // ── Real Analysis ──────────────────────────────────────────────────────
  {
    id: "ra-reals",
    moduleId: "real-analysis",
    code: "ANA.1.1",
    title: "Real Numbers & Completeness",
    description:
      "Construction of the real numbers via Dedekind cuts or Cauchy sequences, and the completeness axiom.",
    nodeType: "core",
    isOptional: false,
    status: "available",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-sequences",
    moduleId: "real-analysis",
    code: "ANA.1.2",
    title: "Sequences & Limits",
    description:
      "Convergence and divergence of real sequences, limit laws, and the Bolzano-Weierstrass theorem.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-series",
    moduleId: "real-analysis",
    code: "ANA.1.3",
    title: "Series",
    description:
      "Convergence tests for infinite series including comparison, ratio, and root tests.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-power-series",
    moduleId: "real-analysis",
    code: "ANA.1.4",
    title: "Power Series",
    description:
      "Radius of convergence, term-by-term differentiation and integration of power series.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-uniform-conv",
    moduleId: "real-analysis",
    code: "ANA.1.5",
    title: "Uniform Convergence",
    description:
      "Pointwise vs. uniform convergence of function sequences and the Weierstrass M-test.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-abs-conv",
    moduleId: "real-analysis",
    code: "ANA.1.6",
    title: "Absolute & Conditional Convergence",
    description:
      "Distinction between absolute and conditional convergence, and Riemann's rearrangement theorem.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-topology-r",
    moduleId: "real-analysis",
    code: "ANA.1.7",
    title: "Topology of \u211d",
    description:
      "Open and closed sets, accumulation points, and the structure of the real line as a topological space.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-limits-func",
    moduleId: "real-analysis",
    code: "ANA.1.8",
    title: "Limits of Functions",
    description:
      "Epsilon-delta definition of limits for real-valued functions and their algebraic properties.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-continuity",
    moduleId: "real-analysis",
    code: "ANA.1.9",
    title: "Continuity",
    description:
      "Continuous functions on \u211d, the intermediate value theorem, and preservation of compactness.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-uniform-cont",
    moduleId: "real-analysis",
    code: "ANA.1.10",
    title: "Uniform Continuity",
    description:
      "Uniform continuity, the Heine-Cantor theorem, and comparison with pointwise continuity.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-diff",
    moduleId: "real-analysis",
    code: "ANA.1.11",
    title: "Differentiation",
    description:
      "Definition of the derivative, differentiability implies continuity, and basic differentiation rules.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-mvt",
    moduleId: "real-analysis",
    code: "ANA.1.12",
    title: "Mean Value Theorem",
    description:
      "Rolle's theorem, the mean value theorem, and applications to monotonicity and inequalities.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-taylor",
    moduleId: "real-analysis",
    code: "ANA.1.13",
    title: "Taylor's Theorem",
    description:
      "Taylor and Maclaurin expansions with various remainder forms and convergence conditions.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-lhopital",
    moduleId: "real-analysis",
    code: "ANA.1.14",
    title: "L'H\u00f4pital's Rule",
    description:
      "Rigorous statement and proof of L'H\u00f4pital's rule for evaluating indeterminate limits.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-integration",
    moduleId: "real-analysis",
    code: "ANA.1.15",
    title: "Riemann Integration",
    description:
      "Riemann sums, the Darboux integral, integrability criteria, and properties of the integral.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-ftc",
    moduleId: "real-analysis",
    code: "ANA.1.16",
    title: "Fundamental Theorem of Calculus",
    description:
      "Both parts of the fundamental theorem linking differentiation and Riemann integration.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-improper",
    moduleId: "real-analysis",
    code: "ANA.1.17",
    title: "Improper Integrals",
    description:
      "Convergence of integrals over unbounded intervals or with unbounded integrands.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-compact",
    moduleId: "real-analysis",
    code: "ANA.1.18",
    title: "Compactness in \u211d\u207f",
    description:
      "Heine-Borel theorem, sequential compactness, and their equivalence in Euclidean space.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-metric",
    moduleId: "real-analysis",
    code: "ANA.1.19",
    title: "Metric Spaces",
    description:
      "General metric spaces, open and closed sets, convergence, and completeness beyond \u211d.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-multi-diff",
    moduleId: "real-analysis",
    code: "ANA.1.20",
    title: "Multivariable Differentiation",
    description:
      "Differentiability of functions of several variables and the Jacobian matrix.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-partial",
    moduleId: "real-analysis",
    code: "ANA.1.21",
    title: "Partial Derivatives",
    description:
      "Partial derivatives, Schwarz's theorem on symmetry of mixed partials, and gradient.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-total-diff",
    moduleId: "real-analysis",
    code: "ANA.1.22",
    title: "Total Differential",
    description:
      "The total derivative as a linear approximation and its relationship to partial derivatives.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-implicit",
    moduleId: "real-analysis",
    code: "ANA.1.23",
    title: "Implicit & Inverse Function Theorems",
    description:
      "Conditions for local invertibility and implicit definition of functions via the Jacobian.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-multi-int",
    moduleId: "real-analysis",
    code: "ANA.1.24",
    title: "Multiple Integrals",
    description:
      "Double and triple integrals, iterated integration, and change of variables formula.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ra-history-newton",
    moduleId: "real-analysis",
    code: "ANA.1.25",
    title: "Newton vs Leibniz",
    description:
      "The parallel invention of calculus by Newton and Leibniz and the ensuing priority dispute.",
    nodeType: "history",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },

  // ── Complex Analysis ───────────────────────────────────────────────────
  {
    id: "ca-complex-nums",
    moduleId: "complex-analysis",
    code: "ANA.2.1",
    title: "Complex Numbers & Topology of \u2102",
    description:
      "Algebraic and geometric properties of complex numbers, modulus, argument, and topology of the complex plane.",
    nodeType: "core",
    isOptional: false,
    status: "available",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-holomorphic",
    moduleId: "complex-analysis",
    code: "ANA.2.2",
    title: "Holomorphic Functions",
    description:
      "Complex differentiability, holomorphic functions, and their fundamental properties.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-cauchy-riemann",
    moduleId: "complex-analysis",
    code: "ANA.2.3",
    title: "Cauchy-Riemann Equations",
    description:
      "Necessary and sufficient conditions for complex differentiability via the Cauchy-Riemann equations.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-power-series-c",
    moduleId: "complex-analysis",
    code: "ANA.2.4",
    title: "Power Series in \u2102",
    description:
      "Convergence of complex power series, radius of convergence, and analytic functions.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-analytic-cont",
    moduleId: "complex-analysis",
    code: "ANA.2.5",
    title: "Analytic Continuation",
    description:
      "Extending holomorphic functions beyond their original domain via analytic continuation.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-integration",
    moduleId: "complex-analysis",
    code: "ANA.2.6",
    title: "Complex Integration",
    description:
      "Line integrals in the complex plane, path independence, and the ML inequality.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-cauchy-thm",
    moduleId: "complex-analysis",
    code: "ANA.2.7",
    title: "Cauchy's Theorem",
    description:
      "Cauchy's integral theorem: a holomorphic function integrated over a closed curve in a simply connected domain is zero.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-cauchy-formula",
    moduleId: "complex-analysis",
    code: "ANA.2.8",
    title: "Cauchy's Integral Formula",
    description:
      "Expressing the value of a holomorphic function inside a contour as an integral over the contour.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-residues",
    moduleId: "complex-analysis",
    code: "ANA.2.9",
    title: "Residues & Poles",
    description:
      "Classification of isolated singularities, residue computation, and the residue theorem.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-real-integrals",
    moduleId: "complex-analysis",
    code: "ANA.2.10",
    title: "Computing Real Integrals via Residues",
    description:
      "Techniques for evaluating definite real integrals by extending to contour integrals in \u2102.",
    nodeType: "application",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-liouville",
    moduleId: "complex-analysis",
    code: "ANA.2.11",
    title: "Liouville's Theorem & FTA",
    description:
      "Every bounded entire function is constant, with the fundamental theorem of algebra as a corollary.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-winding",
    moduleId: "complex-analysis",
    code: "ANA.2.12",
    title: "Winding Numbers",
    description:
      "Definition and properties of the winding number and its role in complex integration theory.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-conformal",
    moduleId: "complex-analysis",
    code: "ANA.2.13",
    title: "Conformal Mappings",
    description:
      "Angle-preserving mappings, M\u00f6bius transformations, and their geometric properties.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-riemann-mapping",
    moduleId: "complex-analysis",
    code: "ANA.2.14",
    title: "Riemann Mapping Theorem",
    description:
      "Any simply connected proper subset of \u2102 is conformally equivalent to the open unit disk.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-harmonic",
    moduleId: "complex-analysis",
    code: "ANA.2.15",
    title: "Harmonic Functions",
    description:
      "Harmonic functions as real and imaginary parts of holomorphic functions, and the maximum principle.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "ca-history",
    moduleId: "complex-analysis",
    code: "ANA.2.16",
    title: "History: Euler, Cauchy, Riemann",
    description:
      "The historical development of complex analysis through the contributions of Euler, Cauchy, and Riemann.",
    nodeType: "history",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },

  // ── Functional Analysis ────────────────────────────────────────────────
  {
    id: "fa-metric-review",
    moduleId: "functional-analysis",
    code: "ANA.3.1",
    title: "Metric & Normed Spaces Review",
    description:
      "Review of metric spaces, norms, and the transition from finite-dimensional to infinite-dimensional analysis.",
    nodeType: "core",
    isOptional: false,
    status: "available",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-normed",
    moduleId: "functional-analysis",
    code: "ANA.3.2",
    title: "Normed Spaces",
    description:
      "Normed vector spaces, equivalence of norms in finite dimensions, and examples of function spaces.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-banach",
    moduleId: "functional-analysis",
    code: "ANA.3.3",
    title: "Banach Spaces & Completeness",
    description:
      "Complete normed spaces, examples such as L^p and C[a,b], and the importance of completeness.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-baire",
    moduleId: "functional-analysis",
    code: "ANA.3.4",
    title: "Baire Category Theorem",
    description:
      "A complete metric space cannot be written as a countable union of nowhere dense sets.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-open-mapping",
    moduleId: "functional-analysis",
    code: "ANA.3.5",
    title: "Open Mapping Theorem",
    description:
      "A surjective bounded linear operator between Banach spaces maps open sets to open sets.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-uniform-bounded",
    moduleId: "functional-analysis",
    code: "ANA.3.6",
    title: "Uniform Boundedness Principle",
    description:
      "A pointwise bounded family of bounded linear operators on a Banach space is uniformly bounded.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-hahn-banach",
    moduleId: "functional-analysis",
    code: "ANA.3.7",
    title: "Hahn-Banach Theorem",
    description:
      "Extension of bounded linear functionals and separation of convex sets in normed spaces.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-weak",
    moduleId: "functional-analysis",
    code: "ANA.3.8",
    title: "Weak Topologies",
    description:
      "Weak and weak-* topologies, Banach-Alaoglu theorem, and weak convergence of sequences.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-bounded-ops",
    moduleId: "functional-analysis",
    code: "ANA.3.9",
    title: "Bounded Linear Operators",
    description:
      "Bounded linear operators between normed spaces, operator norms, and the space B(X, Y).",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-operators",
    moduleId: "functional-analysis",
    code: "ANA.3.10",
    title: "Operators",
    description:
      "Spectrum of an operator, resolvent, and classification of operators on Banach and Hilbert spaces.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-hilbert",
    moduleId: "functional-analysis",
    code: "ANA.3.11",
    title: "Hilbert Spaces",
    description:
      "Inner product spaces, completeness, orthonormal bases, and the geometry of Hilbert spaces.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-orthogonal",
    moduleId: "functional-analysis",
    code: "ANA.3.12",
    title: "Orthogonality & Projections",
    description:
      "Orthogonal complements, projection theorem, and orthogonal decomposition in Hilbert spaces.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-riesz",
    moduleId: "functional-analysis",
    code: "ANA.3.13",
    title: "Riesz Representation",
    description:
      "Every continuous linear functional on a Hilbert space is represented by an inner product with a fixed element.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-compact-ops",
    moduleId: "functional-analysis",
    code: "ANA.3.14",
    title: "Compact Operators",
    description:
      "Compact operators on Hilbert spaces, approximation by finite-rank operators, and the Fredholm alternative.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-spectral",
    moduleId: "functional-analysis",
    code: "ANA.3.15",
    title: "Spectral Theorem",
    description:
      "Diagonalization of compact self-adjoint operators and the spectral theorem for bounded operators.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-distributions",
    moduleId: "functional-analysis",
    code: "ANA.3.16",
    title: "Distributions",
    description:
      "Generalized functions in the sense of Schwartz, the Dirac delta, and operations on distributions.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "fa-history",
    moduleId: "functional-analysis",
    code: "ANA.3.15",
    title: "History: Hilbert, Banach, von Neumann",
    description:
      "The birth of functional analysis through the work of Hilbert, Banach, and von Neumann in the early 20th century.",
    nodeType: "history",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
];

// ---------------------------------------------------------------------------
// Edges
// ---------------------------------------------------------------------------

export const ANALYSIS_EDGES: EdgeData[] = [
  // ── Real Analysis edges ────────────────────────────────────────────────

  // ra-reals → ra-sequences
  { moduleId: "real-analysis", sourceId: "ra-reals", targetId: "ra-sequences", type: "prerequisite" },
  // ra-sequences → ra-series
  { moduleId: "real-analysis", sourceId: "ra-sequences", targetId: "ra-series", type: "prerequisite" },
  // ra-series → ra-power-series
  { moduleId: "real-analysis", sourceId: "ra-series", targetId: "ra-power-series", type: "prerequisite" },
  // ra-power-series → ra-uniform-conv
  { moduleId: "real-analysis", sourceId: "ra-power-series", targetId: "ra-uniform-conv", type: "prerequisite" },
  // ra-series → ra-abs-conv
  { moduleId: "real-analysis", sourceId: "ra-series", targetId: "ra-abs-conv", type: "prerequisite" },
  // ra-sequences → ra-topology-r
  { moduleId: "real-analysis", sourceId: "ra-sequences", targetId: "ra-topology-r", type: "prerequisite" },
  // ra-topology-r → ra-limits-func
  { moduleId: "real-analysis", sourceId: "ra-topology-r", targetId: "ra-limits-func", type: "prerequisite" },
  // ra-limits-func → ra-continuity
  { moduleId: "real-analysis", sourceId: "ra-limits-func", targetId: "ra-continuity", type: "prerequisite" },
  // ra-continuity → ra-uniform-cont
  { moduleId: "real-analysis", sourceId: "ra-continuity", targetId: "ra-uniform-cont", type: "prerequisite" },
  // ra-continuity → ra-diff
  { moduleId: "real-analysis", sourceId: "ra-continuity", targetId: "ra-diff", type: "prerequisite" },
  // ra-diff → ra-mvt
  { moduleId: "real-analysis", sourceId: "ra-diff", targetId: "ra-mvt", type: "prerequisite" },
  // ra-mvt → ra-taylor
  { moduleId: "real-analysis", sourceId: "ra-mvt", targetId: "ra-taylor", type: "prerequisite" },
  // ra-diff → ra-lhopital
  { moduleId: "real-analysis", sourceId: "ra-diff", targetId: "ra-lhopital", type: "prerequisite" },
  // ra-continuity → ra-integration
  { moduleId: "real-analysis", sourceId: "ra-continuity", targetId: "ra-integration", type: "prerequisite" },
  // ra-integration → ra-ftc
  { moduleId: "real-analysis", sourceId: "ra-integration", targetId: "ra-ftc", type: "prerequisite" },
  // ra-integration → ra-improper
  { moduleId: "real-analysis", sourceId: "ra-integration", targetId: "ra-improper", type: "prerequisite" },
  // ra-topology-r → ra-compact
  { moduleId: "real-analysis", sourceId: "ra-topology-r", targetId: "ra-compact", type: "prerequisite" },
  // ra-sequences → ra-metric
  { moduleId: "real-analysis", sourceId: "ra-sequences", targetId: "ra-metric", type: "prerequisite" },
  // ra-metric → ra-compact
  { moduleId: "real-analysis", sourceId: "ra-metric", targetId: "ra-compact", type: "prerequisite" },
  // ra-sequences → ra-history-newton (soft — history node)
  { moduleId: "real-analysis", sourceId: "ra-reals", targetId: "ra-history-newton", type: "enrichment" },
  // ra-continuity, ra-diff → ra-multi-diff
  { moduleId: "real-analysis", sourceId: "ra-continuity", targetId: "ra-multi-diff", type: "prerequisite" },
  { moduleId: "real-analysis", sourceId: "ra-diff", targetId: "ra-multi-diff", type: "prerequisite" },
  // ra-multi-diff → ra-partial
  { moduleId: "real-analysis", sourceId: "ra-multi-diff", targetId: "ra-partial", type: "prerequisite" },
  // ra-partial → ra-total-diff
  { moduleId: "real-analysis", sourceId: "ra-partial", targetId: "ra-total-diff", type: "prerequisite" },
  // ra-total-diff → ra-implicit
  { moduleId: "real-analysis", sourceId: "ra-total-diff", targetId: "ra-implicit", type: "prerequisite" },
  // ra-integration → ra-multi-int
  { moduleId: "real-analysis", sourceId: "ra-integration", targetId: "ra-multi-int", type: "prerequisite" },

  // ── Complex Analysis edges ─────────────────────────────────────────────

  // ca-complex-nums → ca-holomorphic
  { moduleId: "complex-analysis", sourceId: "ca-complex-nums", targetId: "ca-holomorphic", type: "prerequisite" },
  // ca-holomorphic → ca-cauchy-riemann
  { moduleId: "complex-analysis", sourceId: "ca-holomorphic", targetId: "ca-cauchy-riemann", type: "prerequisite" },
  // ca-holomorphic → ca-power-series-c
  { moduleId: "complex-analysis", sourceId: "ca-holomorphic", targetId: "ca-power-series-c", type: "prerequisite" },
  // ca-power-series-c → ca-analytic-cont
  { moduleId: "complex-analysis", sourceId: "ca-power-series-c", targetId: "ca-analytic-cont", type: "prerequisite" },
  // ca-holomorphic → ca-integration
  { moduleId: "complex-analysis", sourceId: "ca-holomorphic", targetId: "ca-integration", type: "prerequisite" },
  // ca-integration → ca-cauchy-thm
  { moduleId: "complex-analysis", sourceId: "ca-integration", targetId: "ca-cauchy-thm", type: "prerequisite" },
  // ca-cauchy-thm → ca-cauchy-formula
  { moduleId: "complex-analysis", sourceId: "ca-cauchy-thm", targetId: "ca-cauchy-formula", type: "prerequisite" },
  // ca-cauchy-formula → ca-residues
  { moduleId: "complex-analysis", sourceId: "ca-cauchy-formula", targetId: "ca-residues", type: "prerequisite" },
  // ca-residues → ca-real-integrals
  { moduleId: "complex-analysis", sourceId: "ca-residues", targetId: "ca-real-integrals", type: "prerequisite" },
  // ca-cauchy-formula → ca-liouville
  { moduleId: "complex-analysis", sourceId: "ca-cauchy-formula", targetId: "ca-liouville", type: "prerequisite" },
  // ca-integration → ca-winding
  { moduleId: "complex-analysis", sourceId: "ca-integration", targetId: "ca-winding", type: "prerequisite" },
  // ca-complex-nums → ca-conformal
  { moduleId: "complex-analysis", sourceId: "ca-complex-nums", targetId: "ca-conformal", type: "prerequisite" },
  // ca-conformal → ca-riemann-mapping
  { moduleId: "complex-analysis", sourceId: "ca-conformal", targetId: "ca-riemann-mapping", type: "prerequisite" },
  // ca-complex-nums → ca-harmonic
  { moduleId: "complex-analysis", sourceId: "ca-complex-nums", targetId: "ca-harmonic", type: "prerequisite" },
  // ca-complex-nums → ca-history (enrichment)
  { moduleId: "complex-analysis", sourceId: "ca-complex-nums", targetId: "ca-history", type: "enrichment" },

  // ── Functional Analysis edges ──────────────────────────────────────────

  // fa-metric-review → fa-normed
  { moduleId: "functional-analysis", sourceId: "fa-metric-review", targetId: "fa-normed", type: "prerequisite" },
  // fa-normed → fa-banach
  { moduleId: "functional-analysis", sourceId: "fa-normed", targetId: "fa-banach", type: "prerequisite" },
  // fa-banach → fa-baire
  { moduleId: "functional-analysis", sourceId: "fa-banach", targetId: "fa-baire", type: "prerequisite" },
  // fa-baire → fa-open-mapping
  { moduleId: "functional-analysis", sourceId: "fa-baire", targetId: "fa-open-mapping", type: "prerequisite" },
  // fa-baire → fa-uniform-bounded
  { moduleId: "functional-analysis", sourceId: "fa-baire", targetId: "fa-uniform-bounded", type: "prerequisite" },
  // fa-banach → fa-hahn-banach
  { moduleId: "functional-analysis", sourceId: "fa-banach", targetId: "fa-hahn-banach", type: "prerequisite" },
  // fa-hahn-banach → fa-weak
  { moduleId: "functional-analysis", sourceId: "fa-hahn-banach", targetId: "fa-weak", type: "prerequisite" },
  // fa-normed → fa-bounded-ops
  { moduleId: "functional-analysis", sourceId: "fa-normed", targetId: "fa-bounded-ops", type: "prerequisite" },
  // fa-bounded-ops → fa-operators
  { moduleId: "functional-analysis", sourceId: "fa-bounded-ops", targetId: "fa-operators", type: "prerequisite" },
  // fa-metric-review → fa-hilbert
  { moduleId: "functional-analysis", sourceId: "fa-metric-review", targetId: "fa-hilbert", type: "prerequisite" },
  // fa-hilbert → fa-orthogonal
  { moduleId: "functional-analysis", sourceId: "fa-hilbert", targetId: "fa-orthogonal", type: "prerequisite" },
  // fa-orthogonal → fa-riesz
  { moduleId: "functional-analysis", sourceId: "fa-orthogonal", targetId: "fa-riesz", type: "prerequisite" },
  // fa-hilbert → fa-compact-ops
  { moduleId: "functional-analysis", sourceId: "fa-hilbert", targetId: "fa-compact-ops", type: "prerequisite" },
  // fa-compact-ops → fa-spectral
  { moduleId: "functional-analysis", sourceId: "fa-compact-ops", targetId: "fa-spectral", type: "prerequisite" },
  // fa-metric-review → fa-distributions
  { moduleId: "functional-analysis", sourceId: "fa-metric-review", targetId: "fa-distributions", type: "prerequisite" },
  // fa-metric-review → fa-history (enrichment)
  { moduleId: "functional-analysis", sourceId: "fa-metric-review", targetId: "fa-history", type: "enrichment" },
];
