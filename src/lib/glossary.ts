export interface GlossaryEntry {
  term: string;
  definition: string;
}

const glossary: Record<string, GlossaryEntry> = {
  field: {
    term: "Corps (Field)",
    definition:
      "Un **corps** $(K, +, \\times)$ est un ensemble muni de deux lois telles que $(K, +)$ est un groupe abélien, $(K^*, \\times)$ est un groupe abélien, et $\\times$ distribue sur $+$. Exemples : $\\mathbb{Q}$, $\\mathbb{R}$, $\\mathbb{C}$, $\\mathbb{F}_p$.",
  },
  root: {
    term: "Racine (Root)",
    definition:
      "Un élément $\\alpha \\in K$ est une **racine** de $P \\in K[X]$ si $P(\\alpha) = 0$.",
  },
  multiplicity: {
    term: "Multiplicité",
    definition:
      "La **multiplicité** d'une racine $\\alpha$ de $P$ est le plus grand $m \\geq 1$ tel que $(X - \\alpha)^m \\mid P$. On note $\\text{mult}(\\alpha, P) = m$.",
  },
  monic: {
    term: "Polynôme unitaire (Monic)",
    definition:
      "Un polynôme est **unitaire** si son coefficient dominant vaut $1$. Par exemple $X^3 - 2X + 1$ est unitaire, mais $2X^2 + 1$ ne l'est pas.",
  },
  degree: {
    term: "Degré",
    definition:
      "Le **degré** d'un polynôme $P = a_n X^n + \\cdots + a_0$ avec $a_n \\neq 0$ est $\\deg P = n$. Par convention, $\\deg 0 = -\\infty$.",
  },
  irreducible: {
    term: "Irréductible",
    definition:
      "Un polynôme $P \\in K[X]$ de degré $\\geq 1$ est **irréductible** sur $K$ s'il ne peut pas s'écrire comme produit de deux polynômes de degré $\\geq 1$ dans $K[X]$.",
  },
  "algebraically closed": {
    term: "Algébriquement clos",
    definition:
      "Un corps $K$ est **algébriquement clos** si tout polynôme non constant de $K[X]$ admet au moins une racine dans $K$. Le corps $\\mathbb{C}$ est algébriquement clos (théorème de d'Alembert-Gauss).",
  },
  "euclidean division": {
    term: "Division euclidienne",
    definition:
      "Pour $A, B \\in K[X]$ avec $B \\neq 0$, il existe un unique couple $(Q, R)$ tel que $A = BQ + R$ avec $\\deg R < \\deg B$.",
  },
  coprime: {
    term: "Premiers entre eux (Coprime)",
    definition:
      "Deux polynômes $A, B \\in K[X]$ sont **premiers entre eux** si $\\gcd(A, B) = 1$, c'est-à-dire que leurs seuls diviseurs communs sont les constantes.",
  },
  "characteristic polynomial": {
    term: "Polynôme caractéristique",
    definition:
      "Pour une matrice $A \\in M_n(K)$, le **polynôme caractéristique** est $\\chi_A(X) = \\det(XI_n - A)$. Ses racines sont les valeurs propres de $A$.",
  },
  "ivt": {
    term: "Théorème des valeurs intermédiaires (IVT)",
    definition:
      "Si $f : [a,b] \\to \\mathbb{R}$ est continue et $f(a) \\cdot f(b) < 0$, alors il existe $c \\in (a,b)$ tel que $f(c) = 0$.",
  },
  "fta": {
    term: "Théorème fondamental de l'algèbre",
    definition:
      "Tout polynôme non constant à coefficients complexes admet au moins une racine dans $\\mathbb{C}$. Autrement dit, $\\mathbb{C}$ est algébriquement clos.",
  },
  "conjugate pairs": {
    term: "Paires conjuguées",
    definition:
      "Si $P \\in \\mathbb{R}[X]$ et $\\alpha = a + bi \\in \\mathbb{C}$ est racine de $P$, alors $\\bar{\\alpha} = a - bi$ est aussi racine de $P$, avec la même multiplicité.",
  },
  "zero divisor": {
    term: "Diviseur de zéro",
    definition:
      "Un élément $a \\neq 0$ d'un anneau $A$ est un **diviseur de zéro** si il existe $b \\neq 0$ tel que $ab = 0$. Un corps n'a pas de diviseurs de zéro.",
  },
  induction: {
    term: "Récurrence",
    definition:
      "**Principe de récurrence :** Si $P(0)$ est vraie et si $P(n) \\Rightarrow P(n+1)$ pour tout $n$, alors $P(n)$ est vraie pour tout $n \\in \\mathbb{N}$.",
  },
};

export default glossary;
