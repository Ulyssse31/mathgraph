// seed-nodes-algebra.ts
// Concept nodes and edges for the 4 Algebra modules.

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

// ╔══════════════════════════════════════════════════════════════╗
// ║              MODULE 1 — Polynomials  (ALG.1)                ║
// ╚══════════════════════════════════════════════════════════════╝

const POLY_NODES: NodeData[] = [
  {
    id: "poly-def",
    moduleId: "polynomials",
    code: "ALG.1.1",
    title: "Polynomial Definition",
    description:
      "Definition of K[X], degree, leading coefficient, monic polynomials.",
    nodeType: "core",
    isOptional: false,
    status: "available",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-ops",
    moduleId: "polynomials",
    code: "ALG.1.2",
    title: "Operations on Polynomials",
    description: "Addition, multiplication, and composition of polynomials.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-roots",
    moduleId: "polynomials",
    code: "ALG.1.3",
    title: "Roots & Zeros",
    description:
      "Definition of roots, multiplicity, and the relation between roots and factorization.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-div",
    moduleId: "polynomials",
    code: "ALG.1.4",
    title: "Euclidean Division",
    description:
      "Division algorithm in K[X], quotient and remainder, and applications.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-gcd",
    moduleId: "polynomials",
    code: "ALG.1.5",
    title: "GCD & Bézout",
    description:
      "Greatest common divisor, Bézout's identity, and coprime polynomials.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-factor",
    moduleId: "polynomials",
    code: "ALG.1.6",
    title: "Factorization",
    description:
      "Unique factorization in K[X] and irreducible decomposition over various fields.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-irred",
    moduleId: "polynomials",
    code: "ALG.1.7",
    title: "Irreducibility Criteria",
    description:
      "Eisenstein's criterion, reduction modulo p, and irreducibility tests over the rationals.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-partial",
    moduleId: "polynomials",
    code: "ALG.1.8",
    title: "Partial Fractions",
    description:
      "Decomposition of rational fractions into simple and multiple pole terms.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  // ── NEW nodes ──
  {
    id: "poly-vieta",
    moduleId: "polynomials",
    code: "ALG.1.9",
    title: "Vieta's Formulas",
    description:
      "Relations between the roots of a polynomial and its coefficients via elementary symmetric functions.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-fta",
    moduleId: "polynomials",
    code: "ALG.1.10",
    title: "Fundamental Theorem of Algebra",
    description:
      "Every non-constant polynomial with complex coefficients has at least one complex root.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-lagrange",
    moduleId: "polynomials",
    code: "ALG.1.11",
    title: "Lagrange Interpolation",
    description:
      "Construction of the unique polynomial of minimal degree passing through a given set of points.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-taylor",
    moduleId: "polynomials",
    code: "ALG.1.12",
    title: "Taylor Expansion of Polynomials",
    description:
      "Expanding a polynomial around a point using its successive derivatives.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-ring",
    moduleId: "polynomials",
    code: "ALG.1.13",
    title: "K[X] as a Ring",
    description:
      "The algebraic structure of K[X] as a commutative ring and principal ideal domain.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-cyclotomic",
    moduleId: "polynomials",
    code: "ALG.1.14",
    title: "Cyclotomic Polynomials",
    description:
      "Minimal polynomials of primitive roots of unity and their irreducibility over the rationals.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-symmetric",
    moduleId: "polynomials",
    code: "ALG.1.15",
    title: "Symmetric Polynomials",
    description:
      "Polynomials invariant under permutation of variables and the fundamental theorem of symmetric polynomials.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-newton-sums",
    moduleId: "polynomials",
    code: "ALG.1.16",
    title: "Newton's Sums",
    description:
      "Recursive relations connecting power sums of roots to elementary symmetric polynomials.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-history",
    moduleId: "polynomials",
    code: "ALG.1.17",
    title: "History of Polynomial Equations",
    description:
      "From Babylonian quadratics to the Italian algebraists and the quest for general solutions by radicals.",
    nodeType: "history",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "poly-pfd-app",
    moduleId: "polynomials",
    code: "ALG.1.18",
    title: "Partial Fractions in Integration",
    description:
      "Applying partial fraction decomposition to compute integrals of rational functions.",
    nodeType: "application",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
];

const POLY_EDGES: EdgeData[] = [
  // poly-def → poly-ops
  { moduleId: "polynomials", sourceId: "poly-def", targetId: "poly-ops", type: "prerequisite" },
  // poly-def → poly-ring
  { moduleId: "polynomials", sourceId: "poly-def", targetId: "poly-ring", type: "prerequisite" },
  // poly-def → poly-history
  { moduleId: "polynomials", sourceId: "poly-def", targetId: "poly-history", type: "prerequisite" },
  // poly-ops → poly-roots
  { moduleId: "polynomials", sourceId: "poly-ops", targetId: "poly-roots", type: "prerequisite" },
  // poly-ops → poly-div
  { moduleId: "polynomials", sourceId: "poly-ops", targetId: "poly-div", type: "prerequisite" },
  // poly-ops → poly-taylor
  { moduleId: "polynomials", sourceId: "poly-ops", targetId: "poly-taylor", type: "prerequisite" },
  // poly-roots → poly-vieta
  { moduleId: "polynomials", sourceId: "poly-roots", targetId: "poly-vieta", type: "prerequisite" },
  // poly-roots → poly-fta
  { moduleId: "polynomials", sourceId: "poly-roots", targetId: "poly-fta", type: "prerequisite" },
  // poly-roots → poly-factor
  { moduleId: "polynomials", sourceId: "poly-roots", targetId: "poly-factor", type: "prerequisite" },
  // poly-div → poly-gcd
  { moduleId: "polynomials", sourceId: "poly-div", targetId: "poly-gcd", type: "prerequisite" },
  // poly-div → poly-lagrange
  { moduleId: "polynomials", sourceId: "poly-div", targetId: "poly-lagrange", type: "prerequisite" },
  // poly-gcd → poly-factor
  { moduleId: "polynomials", sourceId: "poly-gcd", targetId: "poly-factor", type: "prerequisite" },
  // poly-ring → poly-irred
  { moduleId: "polynomials", sourceId: "poly-ring", targetId: "poly-irred", type: "prerequisite" },
  // poly-irred → poly-cyclotomic
  { moduleId: "polynomials", sourceId: "poly-irred", targetId: "poly-cyclotomic", type: "prerequisite" },
  // poly-factor → poly-irred
  { moduleId: "polynomials", sourceId: "poly-factor", targetId: "poly-irred", type: "prerequisite" },
  // poly-factor → poly-partial
  { moduleId: "polynomials", sourceId: "poly-factor", targetId: "poly-partial", type: "prerequisite" },
  // poly-fta → poly-irred
  { moduleId: "polynomials", sourceId: "poly-fta", targetId: "poly-irred", type: "prerequisite" },
  // poly-vieta → poly-symmetric
  { moduleId: "polynomials", sourceId: "poly-vieta", targetId: "poly-symmetric", type: "prerequisite" },
  // poly-symmetric → poly-newton-sums
  { moduleId: "polynomials", sourceId: "poly-symmetric", targetId: "poly-newton-sums", type: "prerequisite" },
  // poly-partial → poly-pfd-app
  { moduleId: "polynomials", sourceId: "poly-partial", targetId: "poly-pfd-app", type: "prerequisite" },
];

// ╔══════════════════════════════════════════════════════════════╗
// ║            MODULE 2 — Linear Algebra  (ALG.2)               ║
// ╚══════════════════════════════════════════════════════════════╝

const LA_NODES: NodeData[] = [
  {
    id: "la-vectors",
    moduleId: "linear-algebra",
    code: "ALG.2.1",
    title: "Vector Spaces",
    description:
      "Definition of vector spaces over a field, spanning sets, linear independence, and bases.",
    nodeType: "core",
    isOptional: false,
    status: "available",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-subspaces",
    moduleId: "linear-algebra",
    code: "ALG.2.2",
    title: "Subspaces & Dimension",
    description:
      "Subspaces, dimension theorem, and the relationship between bases and dimension.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-maps",
    moduleId: "linear-algebra",
    code: "ALG.2.3",
    title: "Linear Maps",
    description:
      "Definition, kernel, image, and fundamental properties of linear transformations between vector spaces.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-matrices",
    moduleId: "linear-algebra",
    code: "ALG.2.4",
    title: "Matrices",
    description:
      "Matrix representation of linear maps, matrix arithmetic, and invertibility.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-determinant",
    moduleId: "linear-algebra",
    code: "ALG.2.5",
    title: "Determinants",
    description:
      "Definition via multilinear alternating forms, computation methods, and geometric interpretation.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-eigen",
    moduleId: "linear-algebra",
    code: "ALG.2.6",
    title: "Eigenvalues",
    description:
      "Eigenvalues, eigenvectors, characteristic polynomial, and eigenspaces of a linear operator.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-diag",
    moduleId: "linear-algebra",
    code: "ALG.2.7",
    title: "Diagonalization",
    description:
      "Criteria for diagonalizability, computing diagonal form, and applications to matrix powers.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-jordan",
    moduleId: "linear-algebra",
    code: "ALG.2.8",
    title: "Jordan Normal Form",
    description:
      "Generalized eigenvectors, Jordan blocks, and the canonical form for non-diagonalizable operators.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-spectral",
    moduleId: "linear-algebra",
    code: "ALG.2.9",
    title: "Spectral Theorem",
    description:
      "Diagonalization of self-adjoint operators in inner product spaces and orthonormal eigenbases.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-cayley",
    moduleId: "linear-algebra",
    code: "ALG.2.10",
    title: "Cayley-Hamilton",
    description:
      "Every square matrix satisfies its own characteristic polynomial.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-systems",
    moduleId: "linear-algebra",
    code: "ALG.2.11",
    title: "Linear Systems",
    description:
      "Gaussian elimination, Cramer's rule, and the structure of solution sets of linear systems.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-change-basis",
    moduleId: "linear-algebra",
    code: "ALG.2.12",
    title: "Change of Basis",
    description:
      "Transition matrices, similarity transformations, and their effect on matrix representations.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-rank",
    moduleId: "linear-algebra",
    code: "ALG.2.13",
    title: "Rank-Nullity Theorem",
    description:
      "The dimension of the kernel plus the dimension of the image equals the dimension of the domain.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-dual",
    moduleId: "linear-algebra",
    code: "ALG.2.14",
    title: "Dual Spaces",
    description:
      "Linear functionals, dual basis, double dual, and the canonical isomorphism for finite-dimensional spaces.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-direct-sum",
    moduleId: "linear-algebra",
    code: "ALG.2.15",
    title: "Direct Sums & Quotients",
    description:
      "Internal and external direct sums, complementary subspaces, and quotient vector spaces.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-inner",
    moduleId: "linear-algebra",
    code: "ALG.2.16",
    title: "Inner Product Spaces",
    description:
      "Inner products, norms, Cauchy-Schwarz inequality, and the geometry of Hilbert-style spaces.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-orthogonality",
    moduleId: "linear-algebra",
    code: "ALG.2.17",
    title: "Orthogonality & Gram-Schmidt",
    description:
      "Orthogonal complements, orthonormal bases, and the Gram-Schmidt orthogonalization process.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-adjoint",
    moduleId: "linear-algebra",
    code: "ALG.2.18",
    title: "Adjoint Operators",
    description:
      "Adjoint of a linear map on an inner product space, self-adjoint and unitary operators.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-bilinear",
    moduleId: "linear-algebra",
    code: "ALG.2.19",
    title: "Bilinear & Quadratic Forms",
    description:
      "Bilinear maps, associated quadratic forms, signature, and Sylvester's law of inertia.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "la-history",
    moduleId: "linear-algebra",
    code: "ALG.2.20",
    title: "History of Linear Algebra",
    description:
      "From systems of equations in ancient China to the abstract axiomatization by Peano and Grassmann.",
    nodeType: "history",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
];

const LA_EDGES: EdgeData[] = [
  // la-vectors → la-subspaces
  { moduleId: "linear-algebra", sourceId: "la-vectors", targetId: "la-subspaces", type: "prerequisite" },
  // la-vectors → la-inner
  { moduleId: "linear-algebra", sourceId: "la-vectors", targetId: "la-inner", type: "prerequisite" },
  // la-vectors → la-history
  { moduleId: "linear-algebra", sourceId: "la-vectors", targetId: "la-history", type: "prerequisite" },
  // la-subspaces → la-maps
  { moduleId: "linear-algebra", sourceId: "la-subspaces", targetId: "la-maps", type: "prerequisite" },
  // la-subspaces → la-direct-sum
  { moduleId: "linear-algebra", sourceId: "la-subspaces", targetId: "la-direct-sum", type: "prerequisite" },
  // la-maps → la-matrices
  { moduleId: "linear-algebra", sourceId: "la-maps", targetId: "la-matrices", type: "prerequisite" },
  // la-maps → la-rank
  { moduleId: "linear-algebra", sourceId: "la-maps", targetId: "la-rank", type: "prerequisite" },
  // la-maps → la-dual
  { moduleId: "linear-algebra", sourceId: "la-maps", targetId: "la-dual", type: "prerequisite" },
  // la-matrices → la-determinant
  { moduleId: "linear-algebra", sourceId: "la-matrices", targetId: "la-determinant", type: "prerequisite" },
  // la-matrices → la-change-basis
  { moduleId: "linear-algebra", sourceId: "la-matrices", targetId: "la-change-basis", type: "prerequisite" },
  // la-matrices → la-bilinear
  { moduleId: "linear-algebra", sourceId: "la-matrices", targetId: "la-bilinear", type: "prerequisite" },
  // la-determinant → la-eigen
  { moduleId: "linear-algebra", sourceId: "la-determinant", targetId: "la-eigen", type: "prerequisite" },
  // la-determinant → la-systems
  { moduleId: "linear-algebra", sourceId: "la-determinant", targetId: "la-systems", type: "prerequisite" },
  // la-eigen → la-diag
  { moduleId: "linear-algebra", sourceId: "la-eigen", targetId: "la-diag", type: "prerequisite" },
  // la-eigen → la-cayley
  { moduleId: "linear-algebra", sourceId: "la-eigen", targetId: "la-cayley", type: "prerequisite" },
  // la-diag → la-jordan
  { moduleId: "linear-algebra", sourceId: "la-diag", targetId: "la-jordan", type: "prerequisite" },
  // la-diag → la-spectral
  { moduleId: "linear-algebra", sourceId: "la-diag", targetId: "la-spectral", type: "prerequisite" },
  // la-inner → la-orthogonality
  { moduleId: "linear-algebra", sourceId: "la-inner", targetId: "la-orthogonality", type: "prerequisite" },
  // la-inner → la-adjoint
  { moduleId: "linear-algebra", sourceId: "la-inner", targetId: "la-adjoint", type: "prerequisite" },
  // la-orthogonality → la-spectral
  { moduleId: "linear-algebra", sourceId: "la-orthogonality", targetId: "la-spectral", type: "prerequisite" },
  // la-adjoint → la-spectral
  { moduleId: "linear-algebra", sourceId: "la-adjoint", targetId: "la-spectral", type: "prerequisite" },
  // la-bilinear → la-spectral
  { moduleId: "linear-algebra", sourceId: "la-bilinear", targetId: "la-spectral", type: "prerequisite" },
  // la-dual → la-adjoint
  { moduleId: "linear-algebra", sourceId: "la-dual", targetId: "la-adjoint", type: "prerequisite" },
];

// ╔══════════════════════════════════════════════════════════════╗
// ║             MODULE 3 — Galois Theory  (ALG.3)               ║
// ╚══════════════════════════════════════════════════════════════╝

const GALOIS_NODES: NodeData[] = [
  {
    id: "galois-ext",
    moduleId: "galois",
    code: "ALG.3.1",
    title: "Field Extensions",
    description:
      "Subfields, extension degree, and the basic framework for studying fields within fields.",
    nodeType: "core",
    isOptional: false,
    status: "available",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-algebraic",
    moduleId: "galois",
    code: "ALG.3.2",
    title: "Algebraic Extensions",
    description:
      "Elements algebraic over a field, algebraic closures, and transcendence degree.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-split",
    moduleId: "galois",
    code: "ALG.3.3",
    title: "Splitting Fields",
    description:
      "The smallest field extension over which a polynomial factors completely into linear factors.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-normal",
    moduleId: "galois",
    code: "ALG.3.4",
    title: "Normal Extensions",
    description:
      "Extensions where every irreducible polynomial with one root in the extension splits completely.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-separable",
    moduleId: "galois",
    code: "ALG.3.5",
    title: "Separable Extensions",
    description:
      "Extensions generated by roots of separable polynomials, and the role of characteristic.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-group",
    moduleId: "galois",
    code: "ALG.3.6",
    title: "Galois Group",
    description:
      "The group of field automorphisms fixing the base field, and its action on roots.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-fundamental",
    moduleId: "galois",
    code: "ALG.3.7",
    title: "Fundamental Theorem",
    description:
      "The bijective correspondence between intermediate fields and subgroups of the Galois group.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-solvable",
    moduleId: "galois",
    code: "ALG.3.8",
    title: "Solvable Groups & Solvability",
    description:
      "Solvable groups, radical extensions, and the criterion for solvability by radicals.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-quintic",
    moduleId: "galois",
    code: "ALG.3.9",
    title: "Insolvability of the Quintic",
    description:
      "Abel-Ruffini theorem: the general polynomial of degree five or higher cannot be solved by radicals.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-finite",
    moduleId: "galois",
    code: "ALG.3.10",
    title: "Finite Fields",
    description:
      "Classification of finite fields, Frobenius automorphism, and their cyclic Galois groups.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-minimal",
    moduleId: "galois",
    code: "ALG.3.11",
    title: "Minimal Polynomials",
    description:
      "The monic irreducible polynomial of least degree satisfied by an algebraic element.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-tower",
    moduleId: "galois",
    code: "ALG.3.12",
    title: "Tower Law",
    description:
      "The multiplicativity of extension degrees in a tower of field extensions.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-examples",
    moduleId: "galois",
    code: "ALG.3.13",
    title: "Computing Galois Groups",
    description:
      "Worked examples of determining Galois groups for specific polynomials and extensions.",
    nodeType: "example",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-constructions",
    moduleId: "galois",
    code: "ALG.3.14",
    title: "Ruler & Compass Constructions",
    description:
      "Using field extensions to characterize which geometric constructions are possible with ruler and compass.",
    nodeType: "application",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "galois-history",
    moduleId: "galois",
    code: "ALG.3.15",
    title: "History of Galois Theory",
    description:
      "The dramatic life of Evariste Galois and the emergence of group theory from the study of polynomial equations.",
    nodeType: "history",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
];

const GALOIS_EDGES: EdgeData[] = [
  // galois-ext → galois-algebraic
  { moduleId: "galois", sourceId: "galois-ext", targetId: "galois-algebraic", type: "prerequisite" },
  // galois-ext → galois-tower
  { moduleId: "galois", sourceId: "galois-ext", targetId: "galois-tower", type: "prerequisite" },
  // galois-ext → galois-constructions
  { moduleId: "galois", sourceId: "galois-ext", targetId: "galois-constructions", type: "prerequisite" },
  // galois-algebraic → galois-split
  { moduleId: "galois", sourceId: "galois-algebraic", targetId: "galois-split", type: "prerequisite" },
  // galois-algebraic → galois-minimal
  { moduleId: "galois", sourceId: "galois-algebraic", targetId: "galois-minimal", type: "prerequisite" },
  // galois-split → galois-normal
  { moduleId: "galois", sourceId: "galois-split", targetId: "galois-normal", type: "prerequisite" },
  // galois-split → galois-separable
  { moduleId: "galois", sourceId: "galois-split", targetId: "galois-separable", type: "prerequisite" },
  // galois-separable → galois-group
  { moduleId: "galois", sourceId: "galois-separable", targetId: "galois-group", type: "prerequisite" },
  // galois-normal → galois-group
  { moduleId: "galois", sourceId: "galois-normal", targetId: "galois-group", type: "prerequisite" },
  // galois-group → galois-fundamental
  { moduleId: "galois", sourceId: "galois-group", targetId: "galois-fundamental", type: "prerequisite" },
  // galois-group → galois-examples
  { moduleId: "galois", sourceId: "galois-group", targetId: "galois-examples", type: "prerequisite" },
  // galois-fundamental → galois-solvable
  { moduleId: "galois", sourceId: "galois-fundamental", targetId: "galois-solvable", type: "prerequisite" },
  // galois-fundamental → galois-finite
  { moduleId: "galois", sourceId: "galois-fundamental", targetId: "galois-finite", type: "prerequisite" },
  // galois-solvable → galois-quintic
  { moduleId: "galois", sourceId: "galois-solvable", targetId: "galois-quintic", type: "prerequisite" },
  // galois-tower → galois-fundamental
  { moduleId: "galois", sourceId: "galois-tower", targetId: "galois-fundamental", type: "prerequisite" },
  // galois-history has no prerequisite edges (standalone)
];

// ╔══════════════════════════════════════════════════════════════╗
// ║          MODULE 4 — Abstract Algebra  (ALG.4)               ║
// ╚══════════════════════════════════════════════════════════════╝

const AA_NODES: NodeData[] = [
  {
    id: "aa-groups",
    moduleId: "abstract-algebra",
    code: "ALG.4.1",
    title: "Groups",
    description:
      "Definition of groups, basic properties, examples including integers, symmetries, and matrix groups.",
    nodeType: "core",
    isOptional: false,
    status: "available",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-subgroups",
    moduleId: "abstract-algebra",
    code: "ALG.4.2",
    title: "Subgroups & Cosets",
    description:
      "Subgroup criteria, left and right cosets, and the index of a subgroup.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-lagrange",
    moduleId: "abstract-algebra",
    code: "ALG.4.3",
    title: "Lagrange's Theorem",
    description:
      "The order of a subgroup divides the order of the group, with consequences for element orders.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-sylow",
    moduleId: "abstract-algebra",
    code: "ALG.4.4",
    title: "Sylow Theorems",
    description:
      "Existence, conjugacy, and number of p-subgroups of maximal order in a finite group.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-normal",
    moduleId: "abstract-algebra",
    code: "ALG.4.5",
    title: "Normal Subgroups & Quotients",
    description:
      "Normal subgroups, quotient groups, and the construction of factor structures.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-morphisms",
    moduleId: "abstract-algebra",
    code: "ALG.4.6",
    title: "Homomorphisms",
    description:
      "Group homomorphisms, kernels, images, and the connection to normal subgroups.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-iso-thm",
    moduleId: "abstract-algebra",
    code: "ALG.4.7",
    title: "Isomorphism Theorems",
    description:
      "The three isomorphism theorems relating quotients, subgroups, and homomorphisms.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-simple",
    moduleId: "abstract-algebra",
    code: "ALG.4.8",
    title: "Simple Groups",
    description:
      "Groups with no proper non-trivial normal subgroups and their role as building blocks.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-cyclic",
    moduleId: "abstract-algebra",
    code: "ALG.4.9",
    title: "Cyclic Groups",
    description:
      "Groups generated by a single element, classification, and structure of their subgroups.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-permutations",
    moduleId: "abstract-algebra",
    code: "ALG.4.10",
    title: "Permutation Groups",
    description:
      "Symmetric groups, cycle notation, transpositions, and the sign of a permutation.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-symmetric",
    moduleId: "abstract-algebra",
    code: "ALG.4.11",
    title: "Symmetric & Alternating Groups",
    description:
      "Structure of S_n, the alternating group A_n, simplicity of A_5, and conjugacy classes.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-actions",
    moduleId: "abstract-algebra",
    code: "ALG.4.12",
    title: "Group Actions",
    description:
      "Groups acting on sets, orbits, stabilizers, and the orbit-stabilizer theorem.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-burnside",
    moduleId: "abstract-algebra",
    code: "ALG.4.13",
    title: "Burnside & Pólya",
    description:
      "Counting orbits under group actions using Burnside's lemma and Pólya enumeration.",
    nodeType: "application",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-rings",
    moduleId: "abstract-algebra",
    code: "ALG.4.14",
    title: "Rings & Ideals",
    description:
      "Ring axioms, ideals, quotient rings, and fundamental examples like polynomial and integer rings.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-pid",
    moduleId: "abstract-algebra",
    code: "ALG.4.15",
    title: "Principal Ideal Domains",
    description:
      "Integral domains where every ideal is generated by a single element, including key examples.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-ufd",
    moduleId: "abstract-algebra",
    code: "ALG.4.16",
    title: "Unique Factorization Domains",
    description:
      "Domains where every non-zero non-unit factors uniquely into irreducibles, up to order and units.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-fields",
    moduleId: "abstract-algebra",
    code: "ALG.4.17",
    title: "Fields",
    description:
      "Commutative rings where every non-zero element is invertible, field extensions, and characteristic.",
    nodeType: "core",
    isOptional: false,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
  {
    id: "aa-history",
    moduleId: "abstract-algebra",
    code: "ALG.4.18",
    title: "History of Abstract Algebra",
    description:
      "From Galois and Dedekind to Noether and Artin: the birth of modern structural algebra.",
    nodeType: "history",
    isOptional: true,
    status: "locked",
    xp: 0,
    posX: 0,
    posY: 0,
  },
];

const AA_EDGES: EdgeData[] = [
  // aa-groups → aa-subgroups
  { moduleId: "abstract-algebra", sourceId: "aa-groups", targetId: "aa-subgroups", type: "prerequisite" },
  // aa-groups → aa-permutations
  { moduleId: "abstract-algebra", sourceId: "aa-groups", targetId: "aa-permutations", type: "prerequisite" },
  // aa-groups → aa-rings
  { moduleId: "abstract-algebra", sourceId: "aa-groups", targetId: "aa-rings", type: "prerequisite" },
  // aa-groups → aa-history
  { moduleId: "abstract-algebra", sourceId: "aa-groups", targetId: "aa-history", type: "prerequisite" },
  // aa-subgroups → aa-lagrange
  { moduleId: "abstract-algebra", sourceId: "aa-subgroups", targetId: "aa-lagrange", type: "prerequisite" },
  // aa-subgroups → aa-normal
  { moduleId: "abstract-algebra", sourceId: "aa-subgroups", targetId: "aa-normal", type: "prerequisite" },
  // aa-subgroups → aa-cyclic
  { moduleId: "abstract-algebra", sourceId: "aa-subgroups", targetId: "aa-cyclic", type: "prerequisite" },
  // aa-lagrange → aa-sylow
  { moduleId: "abstract-algebra", sourceId: "aa-lagrange", targetId: "aa-sylow", type: "prerequisite" },
  // aa-normal → aa-morphisms
  { moduleId: "abstract-algebra", sourceId: "aa-normal", targetId: "aa-morphisms", type: "prerequisite" },
  // aa-normal → aa-simple
  { moduleId: "abstract-algebra", sourceId: "aa-normal", targetId: "aa-simple", type: "prerequisite" },
  // aa-morphisms → aa-iso-thm
  { moduleId: "abstract-algebra", sourceId: "aa-morphisms", targetId: "aa-iso-thm", type: "prerequisite" },
  // aa-morphisms → aa-rings
  { moduleId: "abstract-algebra", sourceId: "aa-morphisms", targetId: "aa-rings", type: "prerequisite" },
  // aa-permutations → aa-symmetric
  { moduleId: "abstract-algebra", sourceId: "aa-permutations", targetId: "aa-symmetric", type: "prerequisite" },
  // aa-permutations → aa-actions
  { moduleId: "abstract-algebra", sourceId: "aa-permutations", targetId: "aa-actions", type: "prerequisite" },
  // aa-actions → aa-burnside
  { moduleId: "abstract-algebra", sourceId: "aa-actions", targetId: "aa-burnside", type: "prerequisite" },
  // aa-rings → aa-pid
  { moduleId: "abstract-algebra", sourceId: "aa-rings", targetId: "aa-pid", type: "prerequisite" },
  // aa-rings → aa-fields
  { moduleId: "abstract-algebra", sourceId: "aa-rings", targetId: "aa-fields", type: "prerequisite" },
  // aa-pid → aa-ufd
  { moduleId: "abstract-algebra", sourceId: "aa-pid", targetId: "aa-ufd", type: "prerequisite" },
];

// ╔══════════════════════════════════════════════════════════════╗
// ║                     PUBLIC EXPORTS                          ║
// ╚══════════════════════════════════════════════════════════════╝

export const ALGEBRA_NODES: NodeData[] = [
  ...POLY_NODES,
  ...LA_NODES,
  ...GALOIS_NODES,
  ...AA_NODES,
];

export const ALGEBRA_EDGES: EdgeData[] = [
  ...POLY_EDGES,
  ...LA_EDGES,
  ...GALOIS_EDGES,
  ...AA_EDGES,
];
