import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

import { ALL_MODULES } from "./seed-modules";
import { ALGEBRA_NODES, ALGEBRA_EDGES } from "./seed-nodes-algebra";
import { ANALYSIS_NODES, ANALYSIS_EDGES } from "./seed-nodes-analysis";
import { OTHER_NODES, OTHER_EDGES } from "./seed-nodes-other";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  // Clear existing data (order matters for FK constraints)
  await prisma.exerciseAttempt.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.projectNode.deleteMany();
  await prisma.project.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.crossModuleEdge.deleteMany();
  await prisma.conceptEdge.deleteMany();
  await prisma.conceptNode.deleteMany();
  await prisma.moduleEdge.deleteMany();
  await prisma.mathModule.deleteMany();

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                        MODULES                              ║
  // ╚══════════════════════════════════════════════════════════════╝

  for (const mod of ALL_MODULES) {
    await prisma.mathModule.create({ data: mod });
  }
  console.log(`  ✓ ${ALL_MODULES.length} modules`);

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                     CONCEPT NODES                           ║
  // ╚══════════════════════════════════════════════════════════════╝

  const allNodes = [...ALGEBRA_NODES, ...ANALYSIS_NODES, ...OTHER_NODES];
  await prisma.conceptNode.createMany({ data: allNodes });
  console.log(`  ✓ ${allNodes.length} concept nodes`);

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                     CONCEPT EDGES                           ║
  // ╚══════════════════════════════════════════════════════════════╝

  const allEdges = [...ALGEBRA_EDGES, ...ANALYSIS_EDGES, ...OTHER_EDGES];
  await prisma.conceptEdge.createMany({ data: allEdges });
  console.log(`  ✓ ${allEdges.length} concept edges`);

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                      MODULE EDGES                           ║
  // ╚══════════════════════════════════════════════════════════════╝

  const moduleEdges = [
    // ── Existing edges (preserved) ──────────────────────────────
    { sourceModuleId: "polynomials", targetModuleId: "arithmetic" },
    { sourceModuleId: "arithmetic", targetModuleId: "polynomials" },
    { sourceModuleId: "polynomials", targetModuleId: "galois" },
    { sourceModuleId: "linear-algebra", targetModuleId: "polynomials" },
    { sourceModuleId: "real-analysis", targetModuleId: "polynomials" },
    { sourceModuleId: "real-analysis", targetModuleId: "linear-algebra" },
    { sourceModuleId: "proof-writing", targetModuleId: "polynomials" },
    { sourceModuleId: "proof-writing", targetModuleId: "arithmetic" },
    { sourceModuleId: "proof-writing", targetModuleId: "real-analysis" },
    { sourceModuleId: "problem-solving", targetModuleId: "polynomials" },
    { sourceModuleId: "problem-solving", targetModuleId: "arithmetic" },
    { sourceModuleId: "linear-algebra", targetModuleId: "abstract-algebra" },
    { sourceModuleId: "abstract-algebra", targetModuleId: "galois" },
    { sourceModuleId: "real-analysis", targetModuleId: "complex-analysis" },
    { sourceModuleId: "real-analysis", targetModuleId: "functional-analysis" },
    { sourceModuleId: "linear-algebra", targetModuleId: "functional-analysis" },
    { sourceModuleId: "real-analysis", targetModuleId: "ode" },
    { sourceModuleId: "ode", targetModuleId: "pde" },
    { sourceModuleId: "linear-algebra", targetModuleId: "ode" },
    { sourceModuleId: "arithmetic", targetModuleId: "analytic-number-theory" },
    { sourceModuleId: "real-analysis", targetModuleId: "analytic-number-theory" },
    { sourceModuleId: "combinatorics", targetModuleId: "probability" },
    { sourceModuleId: "probability", targetModuleId: "statistics" },
    { sourceModuleId: "probability", targetModuleId: "information-theory" },
    { sourceModuleId: "mathematical-logic", targetModuleId: "theory-of-computation" },
    { sourceModuleId: "linear-algebra", targetModuleId: "operations-research" },
    { sourceModuleId: "real-analysis", targetModuleId: "mathematical-physics" },
    { sourceModuleId: "linear-algebra", targetModuleId: "mathematical-physics" },
    { sourceModuleId: "functional-analysis", targetModuleId: "mathematical-physics" },
    { sourceModuleId: "mathematical-logic", targetModuleId: "proof-writing" },
    { sourceModuleId: "euclidean-geometry", targetModuleId: "topology" },
    { sourceModuleId: "topology", targetModuleId: "differential-geometry" },
    { sourceModuleId: "real-analysis", targetModuleId: "topology" },
    { sourceModuleId: "combinatorics", targetModuleId: "game-theory" },

    // ── Foundations & Logic ──────────────────────────────────────
    { sourceModuleId: "mathematical-logic", targetModuleId: "problem-solving" },
    { sourceModuleId: "mathematical-logic", targetModuleId: "using-lean" },
    { sourceModuleId: "proof-writing", targetModuleId: "using-lean" },
    { sourceModuleId: "mathematics-education", targetModuleId: "problem-solving" },
    { sourceModuleId: "history-of-math", targetModuleId: "philosophy-of-math" },

    // ── Algebra internal ────────────────────────────────────────
    { sourceModuleId: "combinatorics", targetModuleId: "order-lattices" },
    { sourceModuleId: "abstract-algebra", targetModuleId: "group-theory" },
    { sourceModuleId: "abstract-algebra", targetModuleId: "associative-rings" },
    { sourceModuleId: "abstract-algebra", targetModuleId: "commutative-algebra" },
    { sourceModuleId: "commutative-algebra", targetModuleId: "algebraic-geometry" },
    { sourceModuleId: "polynomials", targetModuleId: "commutative-algebra" },
    { sourceModuleId: "galois", targetModuleId: "algebraic-geometry" },
    { sourceModuleId: "group-theory", targetModuleId: "topological-groups" },
    { sourceModuleId: "associative-rings", targetModuleId: "nonassociative-algebras" },
    { sourceModuleId: "abstract-algebra", targetModuleId: "category-theory" },
    { sourceModuleId: "category-theory", targetModuleId: "k-theory" },
    { sourceModuleId: "algebraic-topology", targetModuleId: "k-theory" },
    { sourceModuleId: "linear-algebra", targetModuleId: "group-theory" },
    { sourceModuleId: "arithmetic", targetModuleId: "combinatorics" },

    // ── Analysis internal ───────────────────────────────────────
    { sourceModuleId: "real-analysis", targetModuleId: "measure-theory" },
    { sourceModuleId: "measure-theory", targetModuleId: "probability" },
    { sourceModuleId: "measure-theory", targetModuleId: "functional-analysis" },
    { sourceModuleId: "complex-analysis", targetModuleId: "several-complex-variables" },
    { sourceModuleId: "complex-analysis", targetModuleId: "potential-theory" },
    { sourceModuleId: "real-analysis", targetModuleId: "special-functions" },
    { sourceModuleId: "complex-analysis", targetModuleId: "special-functions" },
    { sourceModuleId: "ode", targetModuleId: "dynamical-systems" },
    { sourceModuleId: "real-analysis", targetModuleId: "sequences-series" },
    { sourceModuleId: "real-analysis", targetModuleId: "approximation-theory" },
    { sourceModuleId: "real-analysis", targetModuleId: "harmonic-analysis" },
    { sourceModuleId: "harmonic-analysis", targetModuleId: "abstract-harmonic-analysis" },
    { sourceModuleId: "topological-groups", targetModuleId: "abstract-harmonic-analysis" },
    { sourceModuleId: "harmonic-analysis", targetModuleId: "integral-transforms" },
    { sourceModuleId: "functional-analysis", targetModuleId: "integral-equations" },
    { sourceModuleId: "functional-analysis", targetModuleId: "operator-theory" },
    { sourceModuleId: "pde", targetModuleId: "calculus-of-variations" },
    { sourceModuleId: "functional-analysis", targetModuleId: "calculus-of-variations" },
    { sourceModuleId: "real-analysis", targetModuleId: "difference-equations" },
    { sourceModuleId: "ode", targetModuleId: "integral-equations" },
    { sourceModuleId: "pde", targetModuleId: "potential-theory" },

    // ── Geometry & Topology internal ────────────────────────────
    { sourceModuleId: "euclidean-geometry", targetModuleId: "convex-geometry" },
    { sourceModuleId: "topology", targetModuleId: "algebraic-topology" },
    { sourceModuleId: "topology", targetModuleId: "manifolds" },
    { sourceModuleId: "differential-geometry", targetModuleId: "manifolds" },
    { sourceModuleId: "differential-geometry", targetModuleId: "global-analysis" },
    { sourceModuleId: "manifolds", targetModuleId: "global-analysis" },
    { sourceModuleId: "algebraic-topology", targetModuleId: "manifolds" },

    // ── Applied Math & Computation ──────────────────────────────
    { sourceModuleId: "linear-algebra", targetModuleId: "numerical-analysis" },
    { sourceModuleId: "real-analysis", targetModuleId: "numerical-analysis" },
    { sourceModuleId: "ode", targetModuleId: "numerical-analysis" },
    { sourceModuleId: "pde", targetModuleId: "numerical-analysis" },
    { sourceModuleId: "theory-of-computation", targetModuleId: "information-theory" },
    { sourceModuleId: "operations-research", targetModuleId: "systems-control" },
    { sourceModuleId: "ode", targetModuleId: "systems-control" },

    // ── Probability, Statistics & Decision Sciences ──────────────
    { sourceModuleId: "statistics", targetModuleId: "mathematical-biology" },
    { sourceModuleId: "probability", targetModuleId: "mathematical-biology" },
    { sourceModuleId: "operations-research", targetModuleId: "game-theory" },
    { sourceModuleId: "probability", targetModuleId: "game-theory" },

    // ── Mathematical Physics ────────────────────────────────────
    { sourceModuleId: "mathematical-physics", targetModuleId: "quantum-theory" },
    { sourceModuleId: "mathematical-physics", targetModuleId: "continuum-mechanics-solids" },
    { sourceModuleId: "mathematical-physics", targetModuleId: "fluid-mechanics" },
    { sourceModuleId: "pde", targetModuleId: "fluid-mechanics" },
    { sourceModuleId: "pde", targetModuleId: "electromagnetic-theory" },
    { sourceModuleId: "pde", targetModuleId: "thermodynamics" },
    { sourceModuleId: "functional-analysis", targetModuleId: "quantum-theory" },
    { sourceModuleId: "operator-theory", targetModuleId: "quantum-theory" },
    { sourceModuleId: "quantum-theory", targetModuleId: "statistical-mechanics" },
    { sourceModuleId: "probability", targetModuleId: "statistical-mechanics" },
    { sourceModuleId: "differential-geometry", targetModuleId: "relativity" },
    { sourceModuleId: "mathematical-physics", targetModuleId: "relativity" },
    { sourceModuleId: "mathematical-physics", targetModuleId: "astronomy-astrophysics" },
    { sourceModuleId: "relativity", targetModuleId: "astronomy-astrophysics" },
    { sourceModuleId: "fluid-mechanics", targetModuleId: "geophysics" },
    { sourceModuleId: "continuum-mechanics-solids", targetModuleId: "fluid-mechanics" },

    // ── Cross-section edges ─────────────────────────────────────
    { sourceModuleId: "algebraic-geometry", targetModuleId: "several-complex-variables" },
    { sourceModuleId: "group-theory", targetModuleId: "algebraic-topology" },
    { sourceModuleId: "category-theory", targetModuleId: "algebraic-topology" },
    { sourceModuleId: "commutative-algebra", targetModuleId: "analytic-number-theory" },
    { sourceModuleId: "dynamical-systems", targetModuleId: "mathematical-physics" },
    { sourceModuleId: "calculus-of-variations", targetModuleId: "mathematical-physics" },
    { sourceModuleId: "differential-geometry", targetModuleId: "mathematical-physics" },
    { sourceModuleId: "numerical-analysis", targetModuleId: "operations-research" },
    { sourceModuleId: "measure-theory", targetModuleId: "harmonic-analysis" },
    { sourceModuleId: "topological-groups", targetModuleId: "differential-geometry" },
    { sourceModuleId: "global-analysis", targetModuleId: "mathematical-physics" },
  ];

  await prisma.moduleEdge.createMany({ data: moduleEdges });
  console.log(`  ✓ ${moduleEdges.length} module edges`);

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                CROSS-MODULE EDGES                           ║
  // ╚══════════════════════════════════════════════════════════════╝

  await prisma.crossModuleEdge.createMany({
    data: [
      {
        sourceModuleId: "polynomials",
        sourceNodeId: "poly-irred",
        targetModuleId: "galois",
        targetNodeId: "galois-ext",
        type: "enrichment",
        depth: 3,
        label: "K[X]/(P) Field Construction",
        description: "Irreducible polynomials generate field extensions via quotient rings.",
      },
      {
        sourceModuleId: "polynomials",
        sourceNodeId: "poly-gcd",
        targetModuleId: "arithmetic",
        targetNodeId: "arith-gcd",
        type: "enrichment",
        depth: 1,
        label: "Euclidean Algorithm Analogy",
        description: "The Euclidean algorithm works identically in \u2124 and K[X] \u2014 both are Euclidean domains.",
      },
      {
        sourceModuleId: "arithmetic",
        sourceNodeId: "arith-modular",
        targetModuleId: "polynomials",
        targetNodeId: "poly-irred",
        type: "soft",
        depth: 2,
        label: "Reduction modulo p",
        description: "Irreducibility over \u211A can be tested by reducing coefficients modulo a prime.",
      },
      {
        sourceModuleId: "polynomials",
        sourceNodeId: "poly-roots",
        targetModuleId: "real-analysis",
        targetNodeId: "ra-continuity",
        type: "enrichment",
        depth: 3,
        label: "d'Alembert-Gauss (FTA)",
        description: "The Fundamental Theorem of Algebra relies on topological properties of \u2102 \u2014 every non-constant polynomial has a complex root.",
      },
      {
        sourceModuleId: "polynomials",
        sourceNodeId: "poly-roots",
        targetModuleId: "real-analysis",
        targetNodeId: "ra-diff",
        type: "soft",
        depth: 2,
        label: "Newton's Method",
        description: "Newton's iterative method uses derivatives to approximate polynomial roots with quadratic convergence.",
      },
      {
        sourceModuleId: "linear-algebra",
        sourceNodeId: "la-eigen",
        targetModuleId: "polynomials",
        targetNodeId: "poly-roots",
        type: "enrichment",
        depth: 2,
        label: "Characteristic Polynomial",
        description: "Eigenvalues of a matrix are exactly the roots of its characteristic polynomial.",
      },
      {
        sourceModuleId: "proof-writing",
        sourceNodeId: "pw-induction",
        targetModuleId: "arithmetic",
        targetNodeId: "arith-primes",
        type: "soft",
        depth: 1,
        label: "Infinitude of Primes",
        description: "Euclid's proof that there are infinitely many primes is a classic application of proof by contradiction.",
      },
      {
        sourceModuleId: "linear-algebra",
        sourceNodeId: "la-eigen",
        targetModuleId: "functional-analysis",
        targetNodeId: "fa-operators",
        type: "enrichment",
        depth: 2,
        label: "Spectral Theory Generalization",
        description: "Finite-dimensional eigenvalue theory generalizes to the spectral theorem for compact operators on Hilbert spaces.",
      },
      {
        sourceModuleId: "real-analysis",
        sourceNodeId: "ra-series",
        targetModuleId: "complex-analysis",
        targetNodeId: "ca-holomorphic",
        type: "enrichment",
        depth: 2,
        label: "Power Series in \u2102",
        description: "Real power series extend naturally to the complex plane, where holomorphicity and convergence are deeply connected.",
      },
      {
        sourceModuleId: "abstract-algebra",
        sourceNodeId: "aa-groups",
        targetModuleId: "galois",
        targetNodeId: "galois-group",
        type: "prerequisite",
        depth: 1,
        label: "Group Theory Foundation",
        description: "The Galois group is a group of field automorphisms \u2014 understanding group theory is essential to Galois theory.",
      },
      {
        sourceModuleId: "probability",
        sourceNodeId: "prob-random",
        targetModuleId: "statistics",
        targetNodeId: "stat-estimation",
        type: "soft",
        depth: 1,
        label: "Distribution Parameters",
        description: "Statistical estimation is fundamentally about inferring the parameters of probability distributions from data.",
      },
    ],
  });
  console.log("  ✓ 11 cross-module edges");

  // ╔══════════════════════════════════════════════════════════════╗
  // ║              LESSON: ROOTS & ZEROS (No Bourbaki)            ║
  // ╚══════════════════════════════════════════════════════════════╝

  const polyRootsSections = [
    {
      type: "motivation",
      title: "Why study roots?",
      content: `You have a polynomial $P(X) = a_nX^n + \\cdots + a_1X + a_0$. The most natural question you can ask is: **for which values of $x$ does $P(x) = 0$?**

This is one of the oldest questions in all of mathematics. The Babylonians were already solving quadratic equations around 2000 BCE — they didn't have our notation, but they had the ideas. The search for [[root]]s drove 300 years of algebra, from Cardano's formula for cubics (1545) to Abel's proof that there is *no* general formula for [[degree]] $\\geq 5$ (1824), and finally Galois's revolutionary insight connecting roots to symmetry groups (1832).

But roots aren't just an algebraic curiosity. They appear everywhere:
- **Physics**: eigenfrequencies of a vibrating system are roots of a [[characteristic polynomial]]
- **Numerical analysis**: Newton's method iteratively approximates roots
- **Number theory**: roots of cyclotomic polynomials generate the $n$-th roots of unity
- **Geometry**: the intersection of curves reduces to solving polynomial equations

Understanding roots is understanding the structure of polynomials themselves.`,
    },
    {
      type: "definition",
      title: "Root (Zero) of a Polynomial",
      commentary: "This is the most fundamental question about a polynomial — when does it vanish? The answer encodes almost everything about its structure. Once you know the roots, you essentially know the polynomial (up to a scalar).",
      content: `Let $K$ be a [[field]] (think $\\mathbb{Q}$, $\\mathbb{R}$, or $\\mathbb{C}$) and let $P \\in K[X]$.

An element $\\alpha \\in K$ is a **root** (or **zero**) of $P$ if $P(\\alpha) = 0$.

**Example.** The polynomial $P(X) = X^2 - 5X + 6$ has roots $\\alpha = 2$ and $\\alpha = 3$, since:
$$P(2) = 4 - 10 + 6 = 0, \\quad P(3) = 9 - 15 + 6 = 0.$$`,
    },
    {
      type: "definition",
      title: "Multiplicity of a Root",
      commentary: "You might wonder: if we already know a number is a [[root]], what more is there to say? Quite a lot, actually. A root can be \"more of a root\" than another — it can vanish harder. The concept of multiplicity captures this: how many times does the factor $(X - \\alpha)$ divide $P$? This distinction matters in practice — a double root of a characteristic polynomial means a non-trivial Jordan block, not just a repeated eigenvalue.",
      content: `Let $\\alpha$ be a root of $P \\in K[X]$. The **[[multiplicity]]** of $\\alpha$ is the largest integer $m \\geq 1$ such that $(X - \\alpha)^m$ divides $P$.

We write $\\text{mult}(\\alpha, P) = m$.

- If $m = 1$: $\\alpha$ is a **simple root**
- If $m = 2$: $\\alpha$ is a **double root**
- If $m \\geq 2$: $\\alpha$ is a **multiple root**

**Example.** $P(X) = (X-1)^3(X+2)$ has root $1$ with multiplicity $3$ and root $-2$ with multiplicity $1$.`,
    },
    {
      type: "theorem",
      title: "Factor Theorem",
      commentary: "This result connects two seemingly different perspectives: *evaluating* a polynomial at a point, and *dividing* it. That bridge is what makes it so powerful — it turns questions about values into questions about divisibility, which is much more algebraic and manipulable.",
      content: `**Theorem (Factor Theorem).** Let $P \\in K[X]$ and $\\alpha \\in K$. Then:
$$\\alpha \\text{ is a root of } P \\iff (X - \\alpha) \\mid P$$

More precisely, $\\text{mult}(\\alpha, P) = m$ if and only if $(X-\\alpha)^m \\mid P$ but $(X-\\alpha)^{m+1} \\nmid P$.

---proof---

Perform [[euclidean division]] of $P$ by $(X - \\alpha)$:
$$P(X) = (X - \\alpha)Q(X) + r, \\quad r \\in K$$

---step---

Evaluate at $X = \\alpha$: $P(\\alpha) = 0 \\cdot Q(\\alpha) + r = r$.

---step---

So $r = P(\\alpha) = 0$ if and only if $(X-\\alpha) \\mid P$.`,
    },
    {
      type: "example",
      title: "Factoring a cubic",
      commentary: "Let's see the Factor Theorem in action. The strategy is simple: find one root (by testing small values), factor it out, and repeat. This is the bread and butter of polynomial algebra.",
      content: `Let $P(X) = X^3 - 6X^2 + 11X - 6$. We notice that $P(1) = 1 - 6 + 11 - 6 = 0$, so $1$ is a [[root]].

By the Factor Theorem, $(X - 1) \\mid P$. Performing polynomial division:
$$P(X) = (X-1)(X^2 - 5X + 6) = (X-1)(X-2)(X-3)$$

The three roots are $1, 2, 3$ — each with [[multiplicity]] $1$.

**Observation:** A [[degree]] 3 polynomial has at most 3 roots. Is this a coincidence?`,
    },
    {
      type: "theorem",
      title: "Bound on the Number of Roots",
      commentary: "The observation from the previous example was not a coincidence at all. In fact, the degree of a polynomial is an *absolute ceiling* on its number of roots. This is a beautiful consequence of the Factor Theorem, proved by [[induction]]. Notice how the proof crucially uses the fact that $K$ is a [[field]] — with no [[zero divisor]]s.",
      content: `**Theorem.** A non-zero polynomial $P \\in K[X]$ of [[degree]] $n$ has **at most $n$ roots** in $K$ (counted with [[multiplicity]]).

---proof---

**Base case.** If $\\deg P = 0$, then $P$ is a non-zero constant with no roots. \u2713

---step---

**Induction step.** Assume the result holds for degree $n - 1$. If $P$ has no roots, we're done.

---step---

Otherwise, let $\\alpha$ be a root. By the Factor Theorem, $P(X) = (X-\\alpha)Q(X)$ with $\\deg Q = n - 1$.

---step---

By the induction hypothesis, $Q$ has at most $n-1$ roots. Any root $\\beta \\neq \\alpha$ of $P$ satisfies $0 = (\\beta - \\alpha)Q(\\beta)$, so $Q(\\beta) = 0$ since $\\beta \\neq \\alpha$ and $K$ is a [[field]] (no [[zero divisor]]s).

---step---

Thus $P$ has at most $1 + (n-1) = n$ roots.`,
    },
    {
      type: "historique",
      title: "The quest for a formula",
      commentary: "Now that we know how to *count* roots, the next question is: can we *compute* them? This question obsessed mathematicians for centuries, and the answer turned out to be far more surprising than anyone expected.",
      content: `The search for general formulas for roots is one of the great stories in mathematics:

- **Degree 2** (~2000 BCE, Babylon): The quadratic formula $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$
- **Degree 3** (1545, Cardano): Published in *Ars Magna*, though discovered by del Ferro and Tartaglia. Involves cube roots.
- **Degree 4** (1545, Ferrari): Found by Cardano's student. Reduces to a degree 3 equation.
- **Degree 5** (1824, Abel): Proved that **no general formula exists** using radicals for [[degree]] $\\geq 5$.
- **The full picture** (1832, Galois): At age 20, \u00C9variste Galois explained *exactly* which polynomials are solvable by radicals, linking roots to group theory. He was killed in a duel the next year.`,
    },
    {
      type: "theorem",
      title: "Fundamental Theorem of Algebra (d'Alembert, 1746 — Gauss, 1799)",
      commentary: "This is arguably the single most important result in all of polynomial algebra. It says that over $\\mathbb{C}$, polynomials have *no secrets* — every polynomial splits completely into linear factors. The surprising thing? Despite being a statement about algebra, every known proof uses analysis or topology. The polynomial world and the continuous world are more connected than they appear.",
      content: `**Theorem ([[fta]]).** Every non-constant polynomial $P \\in \\mathbb{C}[X]$ has at least one [[root]] in $\\mathbb{C}$.

**Equivalently:** Every $P \\in \\mathbb{C}[X]$ of [[degree]] $n \\geq 1$ factors completely as:
$$P(X) = a_n(X - \\alpha_1)(X - \\alpha_2)\\cdots(X - \\alpha_n)$$
where $\\alpha_1, \\ldots, \\alpha_n \\in \\mathbb{C}$ (not necessarily distinct).

This means $\\mathbb{C}$ is **[[algebraically closed]]**: you never need to "go bigger" to find roots. Over $\\mathbb{R}$, the polynomial $X^2 + 1$ has no roots. Over $\\mathbb{C}$, it factors as $(X-i)(X+i)$.

---proof---

*This is fundamentally a topological/analytic result — purely algebraic proofs don't exist!*

---step---

The key idea is that $|P(z)| \\to \\infty$ as $|z| \\to \\infty$. Since $|P|$ is continuous and goes to infinity, it attains a minimum at some point $z_0 \\in \\mathbb{C}$.

---step---

One then shows (by a local perturbation argument) that if $P(z_0) \\neq 0$, one can find a direction to decrease $|P|$ — contradiction. So $P(z_0) = 0$.`,
    },
    {
      type: "remark",
      title: "Irreducible polynomials over \u211D",
      commentary: "The FTA tells us that over $\\mathbb{C}$ everything factors into degree 1 pieces. But what about $\\mathbb{R}$? We can't always reach degree 1 (think of $X^2 + 1$), but we can always reach degree 2. This is because complex roots of real polynomials always come in [[conjugate pairs]].",
      content: `Over $\\mathbb{R}$, polynomials don't always factor into linear terms. But the [[fta]] constrains what's possible:

**Every [[irreducible]] polynomial in $\\mathbb{R}[X]$ has [[degree]] 1 or 2.**

*Why?* Complex roots of a real polynomial come in [[conjugate pairs]]: if $\\alpha = a + bi$ is a root, so is $\\bar{\\alpha} = a - bi$. The product $(X - \\alpha)(X - \\bar{\\alpha}) = X^2 - 2aX + (a^2 + b^2) \\in \\mathbb{R}[X]$ is a real quadratic factor.

So every real polynomial factors as a product of linear and irreducible quadratic factors. For instance:
$$X^4 + 1 = (X^2 + \\sqrt{2}X + 1)(X^2 - \\sqrt{2}X + 1)$$
Both quadratic factors are [[irreducible]] over $\\mathbb{R}$ (negative discriminant).`,
    },
  ];

  await prisma.lesson.create({
    data: {
      nodeId: "poly-roots",
      content: "Roots and Zeros of Polynomials \u2014 a complete introduction.",
      sections: JSON.stringify(polyRootsSections),
    },
  });
  console.log("  ✓ 1 lesson (Roots & Zeros)");

  // ╔══════════════════════════════════════════════════════════════╗
  // ║            EXERCISES FOR POLY-ROOTS                         ║
  // ╚══════════════════════════════════════════════════════════════╝

  await prisma.exercise.createMany({
    data: [
      {
        nodeId: "poly-roots",
        title: "Find the roots of a quadratic",
        type: "computational",
        statement: "Find all roots of the polynomial $P(X) = X^2 - 5X + 6$ in $\\mathbb{R}$.",
        difficulty: 1,
        hints: JSON.stringify([
          "Try to factor the polynomial as $(X-a)(X-b)$.",
          "What two numbers multiply to 6 and add to 5?",
        ]),
        solution: "$P(X) = (X-2)(X-3)$, so the roots are $x = 2$ and $x = 3$.",
        answer: "2, 3",
        orderIndex: 0,
      },
      {
        nodeId: "poly-roots",
        title: "Fourth roots of unity",
        type: "computational",
        statement: "Find all roots of $X^4 - 1$ in $\\mathbb{C}$. Express them in the form $a + bi$.",
        difficulty: 2,
        hints: JSON.stringify([
          "Factor $X^4 - 1 = (X^2-1)(X^2+1)$.",
          "Each quadratic factor gives two roots. What are the roots of $X^2+1$ in $\\mathbb{C}$?",
        ]),
        solution: "$X^4 - 1 = (X-1)(X+1)(X-i)(X+i)$. The four roots are $1, -1, i, -i$.",
        answer: "1, -1, i, -i",
        orderIndex: 1,
      },
      {
        nodeId: "poly-roots",
        title: "Which theorem guarantees a root in \u2102?",
        type: "qcm",
        statement: "Which theorem guarantees that every non-constant polynomial $P \\in \\mathbb{C}[X]$ has at least one root in $\\mathbb{C}$?",
        difficulty: 2,
        hints: JSON.stringify([]),
        solution: "The Fundamental Theorem of Algebra (d'Alembert-Gauss) states that $\\mathbb{C}$ is algebraically closed.",
        answer: "",
        choices: JSON.stringify([
          { text: "Rolle's Theorem", correct: false },
          { text: "Fundamental Theorem of Algebra", correct: true },
          { text: "Bolzano-Weierstrass Theorem", correct: false },
          { text: "Intermediate Value Theorem", correct: false },
        ]),
        orderIndex: 2,
      },
      {
        nodeId: "poly-roots",
        title: "Real root of a specific quintic",
        type: "proof",
        statement: "Show that the polynomial $P(X) = X^5 + X + 1$ has exactly one real root, and that this root is negative.",
        difficulty: 3,
        hints: JSON.stringify([
          "Study the derivative $P'(X) = 5X^4 + 1$. Is it always positive?",
          "If $P'(X) > 0$ for all $x \\in \\mathbb{R}$, what does that tell you about the number of real roots?",
          "Check the signs: $P(0) = 1 > 0$. What happens as $x \\to -\\infty$?",
        ]),
        solution: `$P'(X) = 5X^4 + 1 > 0$ for all $x \\in \\mathbb{R}$, so $P$ is strictly increasing on $\\mathbb{R}$.

A continuous strictly increasing function crosses the $x$-axis at most once. Since $\\lim_{x \\to -\\infty} P(x) = -\\infty$ and $\\lim_{x \\to +\\infty} P(x) = +\\infty$, by the Intermediate Value Theorem, $P$ has exactly one real root $\\alpha$.

Since $P(0) = 1 > 0$ and $P$ is increasing, we need $\\alpha < 0$ (the root is to the left of $0$). \u220E`,
        answer: "",
        orderIndex: 3,
      },
      {
        nodeId: "poly-roots",
        title: "Odd-degree polynomials always have a real root",
        type: "proof",
        statement: "Prove that every polynomial of odd degree with real coefficients has at least one real root.",
        difficulty: 4,
        hints: JSON.stringify([
          "What is the behavior of $P(x)$ as $x \\to +\\infty$ and $x \\to -\\infty$ for odd degree?",
          "The leading term $a_n x^n$ dominates. For odd $n$, $a_n x^n \\to +\\infty$ and $a_n x^n \\to -\\infty$ (or vice versa).",
          "Apply the Intermediate Value Theorem.",
          "Alternatively: use the fact that complex roots of real polynomials come in conjugate pairs. If all roots were complex (non-real), they'd pair up, giving an even count.",
        ]),
        solution: `**Proof (analytic).** Let $P(X) = a_nX^n + \\cdots + a_0$ with $n$ odd and $a_n \\neq 0$.

WLOG $a_n > 0$ (otherwise consider $-P$). Then:
$$\\lim_{x \\to +\\infty} P(x) = +\\infty, \\quad \\lim_{x \\to -\\infty} P(x) = -\\infty$$

Since $P$ is continuous and changes sign, by the Intermediate Value Theorem, there exists $\\alpha \\in \\mathbb{R}$ with $P(\\alpha) = 0$. \u220E

**Alternative proof (algebraic).** By the FTA, $P$ has $n$ roots in $\\mathbb{C}$ (counted with multiplicity). Complex roots of a real polynomial come in conjugate pairs $(\\alpha, \\bar{\\alpha})$. Since $n$ is odd, the roots cannot all be paired \u2014 at least one must satisfy $\\alpha = \\bar{\\alpha}$, i.e., $\\alpha \\in \\mathbb{R}$. \u220E`,
        answer: "",
        orderIndex: 4,
      },
    ],
  });
  console.log("  ✓ 5 exercises");

  // ╔══════════════════════════════════════════════════════════════╗
  // ║                 PROJECT (X-ENS style)                       ║
  // ╚══════════════════════════════════════════════════════════════╝

  await prisma.project.create({
    data: {
      id: "newton-fixed-point",
      title: "Polynomials and Fixed Points: Newton's Method Convergence",
      description:
        "An X-ENS style problem exploring the convergence of Newton's method for polynomial root-finding, connecting polynomial algebra with real analysis.",
      moduleId: "polynomials",
      difficulty: 4,
      statement: `## Context

Newton's method is one of the most important algorithms in numerical mathematics. Given a differentiable function $f$ and an initial guess $x_0$, the sequence:
$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$
converges (under suitable conditions) to a root of $f$.

In this problem, we study Newton's method specifically for polynomials, making the connection between algebraic properties of the polynomial and the convergence behavior.

---

## Part I \u2014 Quadratic case

Let $P(X) = X^2 - a$ where $a > 0$, and define the Newton iteration $g(x) = x - \\frac{P(x)}{P'(x)}$.

**1.** Show that $g(x) = \\frac{1}{2}\\left(x + \\frac{a}{x}\\right)$.

**2.** For $x_0 > 0$, prove that $x_n \\geq \\sqrt{a}$ for all $n \\geq 1$. *(Hint: AM-GM inequality)*

**3.** Deduce that the sequence $(x_n)_{n \\geq 1}$ is decreasing and converges to $\\sqrt{a}$.

**4.** Show that the convergence is **quadratic**: there exists $C > 0$ such that $|x_{n+1} - \\sqrt{a}| \\leq C|x_n - \\sqrt{a}|^2$.

---

## Part II \u2014 General polynomial case

Let $P \\in \\mathbb{R}[X]$ have a simple root $\\alpha$ (i.e., $P(\\alpha) = 0$ and $P'(\\alpha) \\neq 0$).

**5.** Write the Newton function $g(x) = x - \\frac{P(x)}{P'(x)}$. Compute $g(\\alpha)$ and $g'(\\alpha)$.

**6.** Deduce that there exists $\\delta > 0$ such that for all $x_0 \\in (\\alpha - \\delta, \\alpha + \\delta)$, the Newton sequence converges to $\\alpha$.

**7.** What happens if $\\alpha$ is a double root of $P$? Compute $g'(\\alpha)$ in this case and discuss the convergence rate.

---

## Part III \u2014 A surprising connection

**8.** Let $P(X) = X^3 - 2X + 2$. Show that $P$ has exactly one real root $\\alpha$, and that $\\alpha \\in (-2, -1)$.

**9.** Apply Newton's method with $x_0 = -1$. Compute $x_1, x_2, x_3$ (to 6 decimal places) and observe the convergence.

**10.** *(Bonus \u2014 X level)* Let $P \\in \\mathbb{R}[X]$ of degree $n \\geq 2$ with all roots real and simple. Define $R(x) = \\frac{P(x)}{P'(x)}$. Show that $R$ has exactly $n - 1$ critical points, and they interlace with the roots of $P$.`,
      hints: JSON.stringify([
        "For Part I.4, set $e_n = x_n - \\sqrt{a}$ and express $e_{n+1}$ in terms of $e_n$ using the recurrence.",
        "For Part II.5, use L'H\u00F4pital's rule or direct computation: $g(\\alpha) = \\alpha - 0/P'(\\alpha) = \\alpha$. For $g'$, differentiate the quotient.",
        "For Part II.7, if $P(X) = (X-\\alpha)^2 Q(X)$, compute $g'(\\alpha)$ and show it equals $1/2$, giving only linear convergence.",
        "For Part III.8, study $P'$ to show $P$ is strictly decreasing on $(-\\infty, \\sqrt{2/3})$ then increasing. Check signs at $-2$ and $-1$.",
        "For Part III.10, note that $R'(x) = 1 - \\frac{P(x)P''(x)}{P'(x)^2}$. The critical points of $R$ are where $P P'' = (P')^2$.",
      ]),
      solution: `## Solution sketch

**Part I.1:** $g(x) = x - \\frac{x^2-a}{2x} = \\frac{2x^2 - x^2 + a}{2x} = \\frac{x^2+a}{2x} = \\frac{1}{2}(x + a/x)$.

**Part I.2:** By AM-GM: $g(x) = \\frac{1}{2}(x + a/x) \\geq \\sqrt{x \\cdot a/x} = \\sqrt{a}$.

**Part I.3:** Since $x_n \\geq \\sqrt{a}$, we have $x_{n+1} - x_n = \\frac{a-x_n^2}{2x_n} \\leq 0$ (since $x_n \\geq \\sqrt{a}$ implies $x_n^2 \\geq a$). Monotone + bounded below \u2192 converges, and the limit must satisfy $L = (L+a/L)/2$, giving $L = \\sqrt{a}$.

**Part I.4:** $e_{n+1} = x_{n+1} - \\sqrt{a} = \\frac{e_n^2}{2x_n} \\leq \\frac{e_n^2}{2\\sqrt{a}}$. Quadratic convergence.

**Part II.5:** $g(\\alpha) = \\alpha$, $g'(x) = \\frac{P(x)P''(x)}{P'(x)^2}$, so $g'(\\alpha) = 0$. This is why convergence is quadratic.

**Part II.6:** Since $g'(\\alpha) = 0$ and $g$ is $C^1$, there exists $\\delta$ such that $|g'(x)| < 1$ on $(\\alpha-\\delta, \\alpha+\\delta)$. By the contraction mapping principle, the iteration converges.

**Part II.7:** For $\\alpha$ double root: $g'(\\alpha) = 1/2 \\neq 0$, so convergence is only linear with rate $1/2$.`,
    },
  });

  await prisma.projectNode.createMany({
    data: [
      { projectId: "newton-fixed-point", nodeId: "poly-roots" },
      { projectId: "newton-fixed-point", nodeId: "poly-div" },
      { projectId: "newton-fixed-point", nodeId: "ra-diff" },
      { projectId: "newton-fixed-point", nodeId: "ra-continuity" },
    ],
  });
  console.log("  ✓ 1 project (Newton's Method)");

  // ╔══════════════════════════════════════════════════════════════╗
  // ║    LESSON: REAL NUMBERS & COMPLETENESS (ra-reals)           ║
  // ╚══════════════════════════════════════════════════════════════╝

  const raRealsSections = [
    {
      type: "motivation",
      title: "Why do we need ℝ?",
      content: `You've been using "real numbers" since high school. You plot them on a line, you compute with decimals, you take square roots. But have you ever stopped to ask: **what *is* a real number, exactly?**

Here is a disturbing fact: the [[rational numbers]] $\\mathbb{Q}$ seem to be "everywhere" on the number line — between any two rationals there is another rational — and yet $\\mathbb{Q}$ is **full of holes**.

The most famous hole: there is no rational number whose square is $2$. The ancient Greeks discovered this around 500 BCE, and it shook the foundations of their mathematics. If $\\mathbb{Q}$ has gaps, then how can we do calculus? How can we talk about limits, continuity, or the area under a curve?

The answer is the **completeness axiom** — the single property that distinguishes $\\mathbb{R}$ from $\\mathbb{Q}$. It fills every gap, and it is the foundation upon which all of analysis is built.

::video[https://www.youtube.com/watch?v=REeaT2mWj6Y]

Without completeness:
- The Intermediate Value Theorem fails
- Bounded sequences need not converge
- Continuous functions on closed intervals need not attain their maximum
- The Riemann integral cannot be properly defined

This chapter constructs the real numbers and proves that completeness is what makes analysis possible.`,
    },
    {
      type: "definition",
      title: "The Rational Numbers ℚ",
      commentary: "Before building $\\mathbb{R}$, let's be precise about what we already have. The rationals form an [[ordered field]] — we can add, subtract, multiply, divide (except by 0), and compare elements. This is a lot of structure! The question is: what's *missing*?",
      content: `The set of **[[rational numbers]]** is:
$$\\mathbb{Q} = \\left\\{ \\frac{p}{q} \\;\\middle|\\; p \\in \\mathbb{Z},\\; q \\in \\mathbb{Z}^* \\right\\}$$

$\\mathbb{Q}$ is an **[[ordered field]]**: it satisfies all the arithmetic axioms (commutativity, associativity, distributivity, existence of inverses) plus a total order $\\leq$ compatible with the operations.

**Key property — density:** Between any two distinct rationals $a < b$, there exists another rational $c$ with $a < c < b$. Simply take $c = \\frac{a+b}{2}$.

So $\\mathbb{Q}$ is "densely packed" — no gaps visible at first glance. And yet…`,
    },
    {
      type: "theorem",
      title: "√2 is Irrational",
      commentary: "This is one of the most beautiful proofs in all of mathematics — and one of the oldest. It reveals that $\\mathbb{Q}$ has genuine *holes*: the point where $x^2 = 2$ should exist on the number line, but no rational sits there. The proof by contradiction is a masterclass in logical reasoning.",
      content: `**Theorem.** There is no rational number $r$ such that $r^2 = 2$. In other words, $\\sqrt{2} \\notin \\mathbb{Q}$.

---proof---

Suppose, for contradiction, that $\\sqrt{2} = \\frac{p}{q}$ with $p, q \\in \\mathbb{Z}$, $q \\neq 0$, and $\\gcd(p,q) = 1$ (fraction in lowest terms).

---step---

Then $p^2 = 2q^2$, so $p^2$ is even. Since the square of an odd number is odd, $p$ must be even: $p = 2k$.

---step---

Substituting: $(2k)^2 = 2q^2 \\implies 4k^2 = 2q^2 \\implies q^2 = 2k^2$.

So $q^2$ is also even, hence $q$ is even.

---step---

But then both $p$ and $q$ are even, contradicting $\\gcd(p,q) = 1$. ∎

**Geometric interpretation:** On the number line, there is a "hole" at the position $\\sqrt{2} \\approx 1.41421\\ldots$ — no fraction sits exactly there, even though rationals cluster arbitrarily close.

::desmos[y=x^2-2]`,
    },
    {
      type: "definition",
      title: "Upper Bounds, Lower Bounds, Supremum, Infimum",
      commentary: "These four concepts are the vocabulary of completeness. The supremum is the key: it's the *tightest possible* upper bound. Think of it as the ceiling that hugs the set from above. The crucial question — which separates $\\mathbb{R}$ from $\\mathbb{Q}$ — is: *does the supremum always exist?*",
      content: `Let $A \\subseteq \\mathbb{R}$ be a non-empty set.

**Upper bound:** A number $M \\in \\mathbb{R}$ is an **upper bound** for $A$ if $a \\leq M$ for all $a \\in A$. If such $M$ exists, $A$ is **bounded above**.

**Supremum (least upper bound):** The **[[supremum]]** of $A$, written $\\sup A$, is the *smallest* upper bound:
$$\\sup A = M \\iff \\begin{cases} \\forall a \\in A,\\; a \\leq M \\\\[4pt] \\forall \\varepsilon > 0,\\; \\exists a \\in A \\text{ s.t. } a > M - \\varepsilon \\end{cases}$$

The second condition says: you can't do better — any number smaller than $M$ fails to be an upper bound.

**Analogously:**
- **Lower bound:** $m \\leq a$ for all $a \\in A$
- **Infimum (greatest lower bound):** $\\inf A$ — the largest lower bound

**Examples:**
| Set $A$ | $\\sup A$ | $\\inf A$ | $\\max A$? | $\\min A$? |
|---------|----------|----------|-----------|-----------|
| $[0, 1]$ | $1$ | $0$ | $1$ ✓ | $0$ ✓ |
| $(0, 1)$ | $1$ | $0$ | ✗ | ✗ |
| $\\{1/n : n \\geq 1\\}$ | $1$ | $0$ | $1$ ✓ | ✗ |
| $\\mathbb{N}$ | $+\\infty$ | $0$ | ✗ | $0$ ✓ |

**Crucial distinction:** The supremum may or may not belong to $A$. When $\\sup A \\in A$, we call it the **maximum**. The set $(0,1)$ has $\\sup = 1$ but no maximum.`,
    },
    {
      type: "definition",
      title: "The Completeness Axiom (Least Upper Bound Property)",
      commentary: "This is *the* axiom. Everything else in real analysis — limits, continuity, differentiation, integration — ultimately rests on this single statement. It's what fills the holes in $\\mathbb{Q}$ and gives us a *complete* number line. Memorize it, internalize it, because you will use it everywhere.",
      content: `**Axiom (Completeness of $\\mathbb{R}$).** Every non-empty subset of $\\mathbb{R}$ that is bounded above has a [[supremum]] in $\\mathbb{R}$.

$$\\forall A \\subseteq \\mathbb{R},\\quad A \\neq \\emptyset \\text{ and } A \\text{ bounded above} \\implies \\sup A \\in \\mathbb{R}$$

**Equivalently** (by considering $-A = \\{-a : a \\in A\\}$): every non-empty set bounded below has an infimum in $\\mathbb{R}$.

**Why $\\mathbb{Q}$ fails this axiom:** Consider the set $A = \\{r \\in \\mathbb{Q} : r^2 < 2\\}$. This is non-empty ($1 \\in A$) and bounded above ($2$ is an upper bound). But $\\sup A = \\sqrt{2} \\notin \\mathbb{Q}$. In $\\mathbb{Q}$, the supremum *doesn't exist*.

This single axiom, added to the ordered field axioms, uniquely characterizes $\\mathbb{R}$ (up to isomorphism). There is essentially **one and only one** complete ordered field.`,
    },
    {
      type: "theorem",
      title: "The Archimedean Property",
      commentary: "This is the first major consequence of completeness, and it says something intuitively obvious: there are no 'infinitely large' or 'infinitely small' real numbers. Given any real number, you can surpass it by adding $1$ enough times. The proof by contradiction is a beautiful application of the supremum.",
      content: `**Theorem (Archimedean Property).** For every $x \\in \\mathbb{R}$, there exists $n \\in \\mathbb{N}$ such that $n > x$.

Equivalently: $\\mathbb{N}$ is **not bounded above** in $\\mathbb{R}$.

---proof---

Suppose, for contradiction, that $\\mathbb{N}$ is bounded above in $\\mathbb{R}$.

---step---

By the Completeness Axiom, $\\alpha = \\sup \\mathbb{N}$ exists in $\\mathbb{R}$.

---step---

Since $\\alpha$ is the *least* upper bound, $\\alpha - 1$ is **not** an upper bound for $\\mathbb{N}$. So there exists $n \\in \\mathbb{N}$ with $n > \\alpha - 1$.

---step---

But then $n + 1 > \\alpha$, and $n + 1 \\in \\mathbb{N}$. This contradicts $\\alpha = \\sup \\mathbb{N}$. ∎

**Useful corollary:** For every $\\varepsilon > 0$, there exists $n \\in \\mathbb{N}^*$ such that $\\frac{1}{n} < \\varepsilon$. (Apply the Archimedean property to $x = 1/\\varepsilon$.)`,
    },
    {
      type: "theorem",
      title: "Density of ℚ in ℝ",
      commentary: "Despite its holes, $\\mathbb{Q}$ is *dense* in $\\mathbb{R}$: between any two reals (no matter how close) there's a rational. This is surprising when you first hear it — $\\mathbb{Q}$ has holes but is still everywhere? Yes. Dense ≠ complete. This proof is a clever use of the Archimedean property.",
      content: `**Theorem.** Between any two distinct real numbers, there exists a [[rational number]].

$$\\forall a, b \\in \\mathbb{R},\\; a < b \\implies \\exists r \\in \\mathbb{Q},\\; a < r < b$$

---proof---

Let $a < b$. By the Archimedean property, choose $n \\in \\mathbb{N}^*$ such that $\\frac{1}{n} < b - a$ (i.e., $n(b-a) > 1$).

---step---

By the Archimedean property again, the set $\\{k \\in \\mathbb{Z} : k > na\\}$ is non-empty. Let $m = \\min\\{k \\in \\mathbb{Z} : k > na\\}$ (well-defined by the well-ordering of $\\mathbb{Z}$ bounded below).

---step---

Then $m > na$ (by definition) and $m - 1 \\leq na$, so $m \\leq na + 1$.

---step---

Therefore: $na < m \\leq na + 1 < na + n(b-a) = nb$. Dividing by $n$: $a < \\frac{m}{n} < b$.

So $r = \\frac{m}{n} \\in \\mathbb{Q}$ satisfies $a < r < b$. ∎

**Similarly:** Between any two reals there also exists an *irrational* number (consider $a + \\frac{\\sqrt{2}}{n}$ for large $n$).`,
    },
    {
      type: "example",
      title: "Computing Suprema and Infima",
      commentary: "Let's practice. Finding a supremum always requires two steps: (1) show it's an upper bound, (2) show nothing smaller works. Get comfortable with this two-step structure — it appears in virtually every analysis proof.",
      content: `**Example 1.** Let $A = \\left\\{ 1 - \\frac{1}{n} : n \\in \\mathbb{N}^* \\right\\} = \\left\\{ 0, \\frac{1}{2}, \\frac{2}{3}, \\frac{3}{4}, \\ldots \\right\\}$

**Claim:** $\\sup A = 1$, $\\inf A = 0$.

*Proof that* $\\sup A = 1$:
1. **Upper bound:** $1 - \\frac{1}{n} < 1$ for all $n \\geq 1$. ✓
2. **Tightness:** For any $\\varepsilon > 0$, choose $n > \\frac{1}{\\varepsilon}$ (Archimedean). Then $1 - \\frac{1}{n} > 1 - \\varepsilon$. ✓

Note: $1 \\notin A$, so $A$ has no maximum.

::desmos[1 - 1/n]

---

**Example 2.** Let $B = \\left\\{ \\frac{(-1)^n}{n} : n \\geq 1 \\right\\} = \\left\\{ -1, \\frac{1}{2}, -\\frac{1}{3}, \\frac{1}{4}, \\ldots \\right\\}$

**Claim:** $\\sup B = \\frac{1}{2}$, $\\inf B = -1$.

Both the sup and inf are *attained*: $\\frac{1}{2} = B$ for $n=2$, and $-1 \\in B$ for $n=1$. So $\\max B = \\frac{1}{2}$ and $\\min B = -1$.

---

**Example 3.** $C = \\{ x \\in \\mathbb{Q} : x^2 < 2 \\}$.

$\\sup C = \\sqrt{2}$. But $\\sqrt{2} \\notin \\mathbb{Q}$, so in $\\mathbb{Q}$ this supremum *does not exist*! This is exactly the gap that the completeness axiom fills.`,
    },
    {
      type: "historique",
      title: "The 19th Century Rigorization of Analysis",
      commentary: "Real analysis wasn't born rigorous — far from it. Newton and Leibniz invented calculus using 'infinitesimals' that they couldn't properly define. It took 200 years to put their ideas on solid ground. This is the story of that revolution.",
      content: `The story of real numbers is one of the great intellectual dramas of mathematics:

- **Antiquity (~500 BCE):** The [[Pythagoreans]] discover that $\\sqrt{2}$ is irrational, allegedly drowning the messenger. Their worldview — "all is number (ratio)" — is shattered.

- **17th century:** Newton and Leibniz create calculus using "infinitesimals" — quantities that are "infinitely small but not zero." The results are powerful but the foundations are shaky. Bishop Berkeley mockingly calls them "ghosts of departed quantities."

- **1821, Cauchy:** Provides the first rigorous definitions of limits and continuity using the $\\varepsilon$-$\\delta$ language. But he still relies on an intuitive notion of "real number."

- **1858, Dedekind:** While teaching calculus in Zürich, Richard Dedekind realizes he cannot *prove* the Intermediate Value Theorem without a rigorous definition of $\\mathbb{R}$. He invents **Dedekind cuts** — a way to construct $\\mathbb{R}$ from $\\mathbb{Q}$.

- **1872, Cantor & Méray:** Independently construct $\\mathbb{R}$ using **Cauchy sequences** of rationals. Two different constructions, same result.

- **1874, Cantor:** Proves that $\\mathbb{R}$ is *uncountable* — there are "more" reals than rationals, even though both are infinite. This opens the door to set theory.

::video[https://www.youtube.com/watch?v=DpwUVExX27E]

The completeness axiom crystallizes 2000 years of struggle into a single, precise statement.`,
    },
    {
      type: "definition",
      title: "Dedekind Cuts — Constructing ℝ from ℚ",
      commentary: "This is where the magic happens. Instead of saying '$\\sqrt{2}$ is a number' and hoping for the best, Dedekind *defines* $\\sqrt{2}$ as the set of all rationals less than it. The real number *is* the cut. This is one of the most elegant constructions in mathematics — it creates something from nothing by carefully describing the shape of the hole.",
      content: `**Definition (Dedekind, 1858).** A **Dedekind cut** is a partition of $\\mathbb{Q}$ into two non-empty sets $(L, R)$ such that:
1. Every element of $L$ is less than every element of $R$
2. $L$ has **no maximum** (no largest element)

The set of all Dedekind cuts *is* $\\mathbb{R}$.

**Example — the cut for $\\sqrt{2}$:**
$$L = \\{r \\in \\mathbb{Q} : r < 0 \\text{ or } r^2 < 2\\}, \\quad R = \\{r \\in \\mathbb{Q} : r \\geq 0 \\text{ and } r^2 \\geq 2\\}$$

This is a valid cut: $L$ has no maximum (you can always find a rational closer to $\\sqrt{2}$ from below), and $R$ has no minimum (same from above). The "gap" between $L$ and $R$ *is* $\\sqrt{2}$.

**For a rational number $q$:** the cut is simply $L = \\{r \\in \\mathbb{Q} : r < q\\}$, $R = \\{r \\in \\mathbb{Q} : r \\geq q\\}$.

**Completeness is now a theorem, not an axiom:** Given a bounded set of cuts, the supremum is constructed by taking the union of all the $L$-parts. This union is itself a valid cut — the one that fills the gap. The construction *guarantees* completeness.`,
    },
    {
      type: "theorem",
      title: "Nested Intervals Theorem",
      commentary: "This is the first 'deep' application of completeness. The idea is simple: if you have a shrinking sequence of closed intervals, they must share at least one common point. This fails for open intervals (think $(0, 1/n)$) and fails in $\\mathbb{Q}$ (the common point might be irrational). The proof is a direct application of the supremum.",
      content: `**Theorem (Nested Intervals / Cantor's Intersection Theorem).** Let $(I_n)_{n \\geq 1}$ be a sequence of non-empty closed bounded intervals $I_n = [a_n, b_n]$ with $I_1 \\supseteq I_2 \\supseteq I_3 \\supseteq \\cdots$. Then:
$$\\bigcap_{n=1}^{\\infty} I_n \\neq \\emptyset$$

If additionally $b_n - a_n \\to 0$, the intersection contains **exactly one point**.

---proof---

The sequences $(a_n)$ is non-decreasing and $(b_n)$ is non-increasing (since the intervals are nested). Also $a_n \\leq b_m$ for all $n, m$ (any left endpoint is $\\leq$ any right endpoint).

---step---

So $\\{a_n\\}$ is bounded above (by any $b_m$). By the **Completeness Axiom**, $\\alpha = \\sup_n a_n$ exists.

---step---

For every $n$: $\\alpha \\geq a_n$ (since $\\alpha$ is an upper bound for $\\{a_n\\}$) and $\\alpha \\leq b_n$ (since $b_n$ is an upper bound for all $a_k$, and $\\alpha$ is the *least* upper bound).

---step---

So $\\alpha \\in [a_n, b_n]$ for every $n$, meaning $\\alpha \\in \\bigcap I_n$. ∎

**Failure for open intervals:** $I_n = (0, 1/n)$. Then $\\bigcap I_n = \\emptyset$ — no positive number is in all intervals. The theorem **requires** closed intervals.

**Failure in $\\mathbb{Q}$:** Take $I_n = [a_n, b_n] \\cap \\mathbb{Q}$ with $a_n \\nearrow \\sqrt{2}$ and $b_n \\searrow \\sqrt{2}$. The intersection is empty in $\\mathbb{Q}$!`,
    },
    {
      type: "remark",
      title: "Characterizations of Completeness — The Big Picture",
      commentary: "The completeness axiom has many equivalent formulations. Each one captures a different facet of 'no gaps in $\\mathbb{R}$.' Learning to see them as the same idea, expressed in different languages, is a sign of mathematical maturity.",
      content: `The following statements are all **equivalent** for an ordered field $\\mathbb{F}$. Any one of them can be taken as the completeness axiom:

1. **Least Upper Bound Property:** Every non-empty bounded-above subset has a supremum.
2. **Greatest Lower Bound Property:** Every non-empty bounded-below subset has an infimum.
3. **Nested Intervals Theorem:** Nested closed bounded intervals have non-empty intersection.
4. **Monotone Convergence Theorem:** Every bounded monotone sequence converges.
5. **Bolzano-Weierstrass Theorem:** Every bounded sequence has a convergent subsequence.
6. **Cauchy Completeness:** Every [[Cauchy sequence]] converges.
7. **Dedekind Completeness:** Every Dedekind cut is realized by an element.

$$\\boxed{\\text{LUB} \\iff \\text{NIT} \\iff \\text{MCT} \\iff \\text{BW} \\iff \\text{Cauchy} \\iff \\text{Dedekind}}$$

All of these fail in $\\mathbb{Q}$. All hold in $\\mathbb{R}$. They are the *same* property wearing different masks.

The first three will be proved in this module. Bolzano-Weierstrass and Cauchy completeness belong to the chapter on **Sequences & Limits**.`,
    },
  ];

  await prisma.lesson.create({
    data: {
      nodeId: "ra-reals",
      content: "Real Numbers & Completeness — the foundation of all analysis.",
      sections: JSON.stringify(raRealsSections),
    },
  });
  console.log("  ✓ 1 lesson (Real Numbers & Completeness)");

  // ╔══════════════════════════════════════════════════════════════╗
  // ║          EXERCISES FOR RA-REALS                             ║
  // ╚══════════════════════════════════════════════════════════════╝

  await prisma.exercise.createMany({
    data: [
      {
        nodeId: "ra-reals",
        title: "Supremum of a concrete set",
        type: "computational",
        statement: `Determine $\\sup A$ and $\\inf A$ for the set:
$$A = \\left\\{ \\frac{n}{n+1} : n \\in \\mathbb{N} \\right\\} = \\left\\{ 0, \\frac{1}{2}, \\frac{2}{3}, \\frac{3}{4}, \\ldots \\right\\}$$
Does $A$ have a maximum? A minimum?`,
        difficulty: 1,
        hints: JSON.stringify([
          "Compute the first few terms: $a_0 = 0$, $a_1 = 1/2$, $a_2 = 2/3$, … Is the sequence increasing?",
          "For the sup: show that $n/(n+1) < 1$ for all $n$, then show that for any $\\varepsilon > 0$ there exists $n$ with $n/(n+1) > 1 - \\varepsilon$.",
          "For the min: what is the smallest element? Is it attained?"
        ]),
        solution: `$\\frac{n}{n+1} = 1 - \\frac{1}{n+1}$, which is strictly increasing and always less than $1$.

**$\\sup A = 1$:**
1. Upper bound: $\\frac{n}{n+1} < 1$ for all $n$. ✓
2. Tightness: For $\\varepsilon > 0$, choose $n > \\frac{1}{\\varepsilon} - 1$ (Archimedean). Then $\\frac{n}{n+1} = 1 - \\frac{1}{n+1} > 1 - \\varepsilon$. ✓

$A$ has **no maximum** since $1 \\notin A$.

**$\\inf A = 0$:** attained at $n = 0$, so $\\min A = 0$. ✓`,
        answer: "sup A = 1, inf A = 0, no max, min = 0",
        orderIndex: 0,
      },
      {
        nodeId: "ra-reals",
        title: "Supremum with alternating signs",
        type: "computational",
        statement: `Let $B = \\left\\{ (-1)^n + \\frac{1}{n} : n \\geq 1 \\right\\}$. Compute $\\sup B$ and $\\inf B$.

*Hint: separate odd and even $n$.*`,
        difficulty: 2,
        hints: JSON.stringify([
          "For odd $n$: $b_n = -1 + 1/n$. For even $n$: $b_n = 1 + 1/n$.",
          "The even terms give $1 + 1/n$ which decreases to $1$. The largest is $b_2 = 3/2$.",
          "The odd terms give $-1 + 1/n$ which increases to $-1$. The smallest is $b_1 = 0$."
        ]),
        solution: `Odd terms: $b_{2k+1} = -1 + \\frac{1}{2k+1}$, ranging from $b_1 = 0$ down toward $-1$.
Even terms: $b_{2k} = 1 + \\frac{1}{2k}$, ranging from $b_2 = \\frac{3}{2}$ down toward $1$.

$\\sup B = \\frac{3}{2}$ (attained at $n = 2$), so $\\max B = \\frac{3}{2}$.
$\\inf B = -1$ (not attained, since $-1 + 1/n > -1$ always), so $B$ has **no minimum**.`,
        answer: "sup B = 3/2, inf B = -1",
        orderIndex: 1,
      },
      {
        nodeId: "ra-reals",
        title: "Which property distinguishes ℝ from ℚ?",
        type: "qcm",
        statement: "Which of the following properties is satisfied by $\\mathbb{R}$ but **not** by $\\mathbb{Q}$?",
        difficulty: 1,
        hints: JSON.stringify([]),
        solution: `The **Least Upper Bound Property** (completeness) is the defining difference. In $\\mathbb{Q}$, the set $\\{r \\in \\mathbb{Q} : r^2 < 2\\}$ is bounded above but has no supremum in $\\mathbb{Q}$.

All the other properties (commutativity, density, Archimedean property) hold in both $\\mathbb{Q}$ and $\\mathbb{R}$.`,
        answer: "",
        choices: JSON.stringify([
          { text: "Commutativity of multiplication", correct: false },
          { text: "Density: between any two elements there is a third", correct: false },
          { text: "Least Upper Bound Property (completeness)", correct: true },
          { text: "Archimedean property", correct: false },
        ]),
        orderIndex: 2,
      },
      {
        nodeId: "ra-reals",
        title: "Dedekind cut identification",
        type: "qcm",
        statement: `Consider the Dedekind cut $(L, R)$ where:
$$L = \\{r \\in \\mathbb{Q} : r < 0 \\text{ or } r^2 < 3\\}, \\quad R = \\mathbb{Q} \\setminus L$$
Which real number does this cut represent?`,
        difficulty: 2,
        hints: JSON.stringify([
          "What positive number $x$ satisfies $x^2 = 3$?",
        ]),
        solution: `The cut places all rationals with $r^2 < 3$ (and negative rationals) in $L$, and all rationals with $r^2 \\geq 3$ in $R$. The "gap" between $L$ and $R$ is at the point where $x^2 = 3$, which is $x = \\sqrt{3}$.`,
        answer: "",
        choices: JSON.stringify([
          { text: "$\\sqrt{2}$", correct: false },
          { text: "$\\sqrt{3}$", correct: true },
          { text: "$\\pi$", correct: false },
          { text: "$e$", correct: false },
        ]),
        orderIndex: 3,
      },
      {
        nodeId: "ra-reals",
        title: "√3 is irrational",
        type: "proof",
        statement: "Prove that $\\sqrt{3}$ is irrational.",
        difficulty: 2,
        hints: JSON.stringify([
          "Mimic the proof for $\\sqrt{2}$: assume $\\sqrt{3} = p/q$ in lowest terms.",
          "Show that $p^2 = 3q^2$ implies $3 \\mid p$. Then substitute $p = 3k$ and derive a contradiction.",
          "You'll need the fact: if $3 \\mid p^2$ then $3 \\mid p$. Why is this true? (Because $3$ is prime.)",
        ]),
        solution: `Suppose $\\sqrt{3} = \\frac{p}{q}$ with $\\gcd(p,q) = 1$. Then $p^2 = 3q^2$.

Since $3 \\mid p^2$ and $3$ is prime, $3 \\mid p$ (Euclid's lemma). Write $p = 3k$:
$$9k^2 = 3q^2 \\implies q^2 = 3k^2 \\implies 3 \\mid q$$

Both $p$ and $q$ are divisible by $3$, contradicting $\\gcd(p,q) = 1$. ∎`,
        answer: "",
        orderIndex: 4,
      },
      {
        nodeId: "ra-reals",
        title: "Archimedean property application",
        type: "proof",
        statement: `Using the Archimedean property, prove that:
$$\\inf\\left\\{ \\frac{1}{n} : n \\in \\mathbb{N}^* \\right\\} = 0$$`,
        difficulty: 2,
        hints: JSON.stringify([
          "You need two things: (1) $0$ is a lower bound, (2) no number greater than $0$ is a lower bound.",
          "For (2): take $\\varepsilon > 0$ and use the Archimedean property to find $n$ with $1/n < \\varepsilon$.",
        ]),
        solution: `Let $A = \\{1/n : n \\in \\mathbb{N}^*\\}$.

(1) **$0$ is a lower bound:** $\\frac{1}{n} > 0$ for all $n \\geq 1$. ✓

(2) **No larger lower bound exists:** Let $\\varepsilon > 0$. By the Archimedean property, there exists $n \\in \\mathbb{N}^*$ with $n > \\frac{1}{\\varepsilon}$, i.e., $\\frac{1}{n} < \\varepsilon$. So $\\varepsilon$ is not a lower bound for $A$. ✓

Therefore $\\inf A = 0$. ∎

Note: $0 \\notin A$, so $A$ has no minimum.`,
        answer: "",
        orderIndex: 5,
      },
      {
        nodeId: "ra-reals",
        title: "Supremum of a sum",
        type: "proof",
        statement: `Let $A, B \\subseteq \\mathbb{R}$ be non-empty and bounded above. Define:
$$A + B = \\{a + b : a \\in A, \\, b \\in B\\}$$
Prove that $\\sup(A + B) = \\sup A + \\sup B$.`,
        difficulty: 3,
        hints: JSON.stringify([
          "Let $\\alpha = \\sup A$ and $\\beta = \\sup B$. First show $\\alpha + \\beta$ is an upper bound for $A + B$.",
          "Then show it's the *least* upper bound: for any $\\varepsilon > 0$, find $a \\in A$ and $b \\in B$ with $a + b > \\alpha + \\beta - \\varepsilon$.",
          "Use the characterization of sup: for $\\varepsilon/2$, find $a > \\alpha - \\varepsilon/2$ and $b > \\beta - \\varepsilon/2$.",
        ]),
        solution: `Let $\\alpha = \\sup A$, $\\beta = \\sup B$.

**Upper bound:** For $a \\in A$ and $b \\in B$: $a \\leq \\alpha$ and $b \\leq \\beta$, so $a + b \\leq \\alpha + \\beta$. ✓

**Least upper bound:** Let $\\varepsilon > 0$. By definition of supremum:
- $\\exists a \\in A$ with $a > \\alpha - \\varepsilon/2$
- $\\exists b \\in B$ with $b > \\beta - \\varepsilon/2$

Then $a + b > \\alpha + \\beta - \\varepsilon$, so $a + b \\in A + B$ and $a + b > (\\alpha + \\beta) - \\varepsilon$.

This shows $\\alpha + \\beta$ is the least upper bound: $\\sup(A+B) = \\sup A + \\sup B$. ∎`,
        answer: "",
        orderIndex: 6,
      },
      {
        nodeId: "ra-reals",
        title: "Nested intervals and √2",
        type: "proof",
        statement: `Construct a sequence of nested intervals $[a_n, b_n]$ such that $b_n - a_n = \\frac{1}{2^n}$ and $\\bigcap_{n=0}^{\\infty} [a_n, b_n] = \\{\\sqrt{2}\\}$.

*Hint: start with $[a_0, b_0] = [1, 2]$ and use bisection — at each step, check whether the midpoint squared is $< 2$ or $\\geq 2$.*`,
        difficulty: 3,
        hints: JSON.stringify([
          "Start: $[1, 2]$. Midpoint: $1.5$. Is $1.5^2 = 2.25 \\geq 2$? Yes, so $\\sqrt{2} \\in [1, 1.5]$.",
          "Next: $[1, 1.5]$. Midpoint: $1.25$. Is $1.25^2 = 1.5625 < 2$? Yes, so $\\sqrt{2} \\in [1.25, 1.5]$.",
          "This is the bisection method. Prove it works by showing $a_n^2 < 2 < b_n^2$ at each step (invariant).",
        ]),
        solution: `**Construction (bisection):** Set $[a_0, b_0] = [1, 2]$. At step $n$, let $m_n = \\frac{a_n + b_n}{2}$.
- If $m_n^2 < 2$: set $a_{n+1} = m_n$, $b_{n+1} = b_n$
- If $m_n^2 \\geq 2$: set $a_{n+1} = a_n$, $b_{n+1} = m_n$

**Invariant:** $a_n^2 < 2 \\leq b_n^2$ and $b_n - a_n = \\frac{1}{2^n}$.

The first few iterations: $[1, 2] \\to [1, 1.5] \\to [1.25, 1.5] \\to [1.375, 1.5] \\to [1.375, 1.4375] \\to \\cdots$

By the Nested Intervals Theorem, $\\bigcap [a_n, b_n] = \\{\\alpha\\}$ for some $\\alpha$. Since $a_n^2 < 2$ for all $n$ and $a_n \\to \\alpha$, we get $\\alpha^2 \\leq 2$. Similarly $b_n^2 \\geq 2$ and $b_n \\to \\alpha$ gives $\\alpha^2 \\geq 2$. So $\\alpha^2 = 2$, i.e., $\\alpha = \\sqrt{2}$. ∎`,
        answer: "",
        orderIndex: 7,
      },
    ],
  });
  console.log("  ✓ 8 exercises (Real Numbers & Completeness)");

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
