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

  await prisma.moduleEdge.createMany({
    data: [
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
    ],
  });
  console.log("  ✓ 34 module edges");

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

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
