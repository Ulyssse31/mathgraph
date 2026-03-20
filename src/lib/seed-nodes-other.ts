// Seed data for: Geometry (GEO.1–3), Combinatorics (COM.1), Logic (LOG.1–2),
// Number Theory (NUM.1–2), Meta-Skills (META.2–4), and all Applied Math modules.

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

// ═══════════════════════════════════════════════════════════════════════════
//  NODES
// ═══════════════════════════════════════════════════════════════════════════

export const OTHER_NODES: NodeData[] = [
  // ───────────────────────────────────────────────────────────────────────
  // Euclidean Geometry (GEO.1) — 15 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "eg-axioms", moduleId: "euclidean-geometry", code: "GEO.1.1", title: "Euclid's Axioms & Foundations", description: "The five postulates, common notions, and the axiomatic method underlying plane geometry.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "eg-triangles", moduleId: "euclidean-geometry", code: "GEO.1.2", title: "Triangles & Congruence", description: "Congruence criteria (SSS, SAS, ASA), triangle inequality, and basic properties.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-similarity", moduleId: "euclidean-geometry", code: "GEO.1.3", title: "Similarity & Thales", description: "Similar triangles, Thales' theorem, and proportional reasoning in geometry.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-trigonometry", moduleId: "euclidean-geometry", code: "GEO.1.4", title: "Trigonometry", description: "Sine, cosine, tangent, the law of sines and cosines, and trigonometric identities.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-circles", moduleId: "euclidean-geometry", code: "GEO.1.5", title: "Circles & Power of a Point", description: "Central and inscribed angles, tangent lines, and the power of a point theorem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-inversions", moduleId: "euclidean-geometry", code: "GEO.1.6", title: "Inversions", description: "Circle inversion, preservation of angles, and applications to hard geometry problems.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-remarkable", moduleId: "euclidean-geometry", code: "GEO.1.7", title: "Remarkable Points & Lines", description: "Centroid, circumcenter, incenter, orthocenter, and the medial triangle.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-euler-line", moduleId: "euclidean-geometry", code: "GEO.1.8", title: "Euler Line & Nine-Point Circle", description: "Collinearity of the circumcenter, centroid, and orthocenter, and the nine-point circle.", nodeType: "example", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-area", moduleId: "euclidean-geometry", code: "GEO.1.9", title: "Area & Measurement", description: "Area formulas for polygons and circles, and the method of dissection.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-transformations", moduleId: "euclidean-geometry", code: "GEO.1.10", title: "Geometric Transformations", description: "Translations, rotations, reflections, and their composition.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-isometries", moduleId: "euclidean-geometry", code: "GEO.1.11", title: "Isometries & Classification", description: "Classification of plane isometries: translations, rotations, reflections, and glide reflections.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-similarities", moduleId: "euclidean-geometry", code: "GEO.1.12", title: "Similarities", description: "Dilations and spiral similarities as compositions of isometries and scaling.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-conics", moduleId: "euclidean-geometry", code: "GEO.1.13", title: "Conics", description: "Ellipses, parabolas, and hyperbolas defined by focus-directrix and as conic sections.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-conics-projective", moduleId: "euclidean-geometry", code: "GEO.1.14", title: "Projective Conics", description: "Conics from the projective viewpoint: cross-ratio, poles, polars, and duality.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-constructions", moduleId: "euclidean-geometry", code: "GEO.1.15", title: "Ruler & Compass Constructions", description: "Classical constructibility, impossible constructions, and the link to field extensions.", nodeType: "application", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "eg-history", moduleId: "euclidean-geometry", code: "GEO.1.16", title: "History: Euclid to Hilbert", description: "From Euclid's Elements to Hilbert's axioms: the evolution of geometric rigor.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Topology (GEO.2) — 16 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "top-spaces", moduleId: "topology", code: "GEO.2.1", title: "Topological Spaces", description: "Open sets, closed sets, neighborhoods, and the axioms defining a topology.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "top-bases", moduleId: "topology", code: "GEO.2.2", title: "Bases & Subbases", description: "Generating a topology from a basis or subbasis, and second-countability.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-product", moduleId: "topology", code: "GEO.2.3", title: "Product Topology", description: "Product of topological spaces, box vs product topology, and projection maps.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-continuity", moduleId: "topology", code: "GEO.2.4", title: "Continuity & Homeomorphisms", description: "Continuous maps, homeomorphisms, and topological invariants.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-quotient", moduleId: "topology", code: "GEO.2.5", title: "Quotient Topology", description: "Quotient maps, identification spaces, and gluing constructions.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-separation", moduleId: "topology", code: "GEO.2.6", title: "Separation Axioms", description: "T0 through T4 spaces, Hausdorff condition, Urysohn's lemma, and normality.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-compact", moduleId: "topology", code: "GEO.2.7", title: "Compactness", description: "Open cover definition, Heine-Borel theorem, and properties of compact spaces.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-tychonoff", moduleId: "topology", code: "GEO.2.8", title: "Tychonoff's Theorem", description: "The product of compact spaces is compact; proof via ultrafilters or Zorn's lemma.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-locally-compact", moduleId: "topology", code: "GEO.2.9", title: "Local Compactness", description: "Locally compact Hausdorff spaces, one-point compactification, and Alexandroff extension.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-connected", moduleId: "topology", code: "GEO.2.10", title: "Connectedness", description: "Connected and disconnected spaces, connected components, and the intermediate value theorem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-path-connected", moduleId: "topology", code: "GEO.2.11", title: "Path Connectedness", description: "Path-connected spaces, locally path-connected spaces, and relation to connectedness.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-metric", moduleId: "topology", code: "GEO.2.12", title: "Metric Spaces & Completeness", description: "Metric topology, Cauchy sequences, completeness, and the Baire category theorem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-fundamental", moduleId: "topology", code: "GEO.2.13", title: "Fundamental Group", description: "Homotopy of paths, the fundamental group, and computation for simple spaces.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-covering", moduleId: "topology", code: "GEO.2.14", title: "Covering Spaces", description: "Covering maps, lifting properties, deck transformations, and classification.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-van-kampen", moduleId: "topology", code: "GEO.2.15", title: "Van Kampen's Theorem", description: "Computing fundamental groups of spaces built by gluing via amalgamated free products.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "top-history", moduleId: "topology", code: "GEO.2.16", title: "History of Topology", description: "From Euler's bridges to Poincare's Analysis Situs and the modern era.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Differential Geometry (GEO.3) — 15 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "dg-curves", moduleId: "differential-geometry", code: "GEO.3.1", title: "Curves in Rn", description: "Parametrized curves, arc length, regularity, and reparametrization.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "dg-curvature-2d", moduleId: "differential-geometry", code: "GEO.3.2", title: "Curvature & Torsion", description: "Curvature of plane and space curves, torsion, and the geometric meaning of bending.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-frenet", moduleId: "differential-geometry", code: "GEO.3.3", title: "Frenet-Serret Formulas", description: "The Frenet frame, Frenet-Serret equations, and reconstruction of curves.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-surfaces", moduleId: "differential-geometry", code: "GEO.3.4", title: "Regular Surfaces", description: "Parametrized surfaces, tangent planes, smooth maps between surfaces.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-first-ff", moduleId: "differential-geometry", code: "GEO.3.5", title: "First Fundamental Form", description: "The intrinsic metric on a surface: lengths, angles, and areas.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-second-ff", moduleId: "differential-geometry", code: "GEO.3.6", title: "Second Fundamental Form", description: "Normal curvature, principal curvatures, and the shape operator.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-gauss-curvature", moduleId: "differential-geometry", code: "GEO.3.7", title: "Gaussian Curvature", description: "Product of principal curvatures, intrinsic vs extrinsic curvature.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-theorema", moduleId: "differential-geometry", code: "GEO.3.8", title: "Theorema Egregium", description: "Gauss's remarkable theorem: Gaussian curvature is an intrinsic invariant.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-mean-curvature", moduleId: "differential-geometry", code: "GEO.3.9", title: "Mean Curvature & Minimal Surfaces", description: "Mean curvature, minimal surfaces, and the Plateau problem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-geodesics", moduleId: "differential-geometry", code: "GEO.3.10", title: "Geodesics", description: "Shortest paths on surfaces, geodesic equations, and the exponential map.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-gauss-map", moduleId: "differential-geometry", code: "GEO.3.11", title: "Gauss Map", description: "The Gauss map from a surface to the unit sphere and its differential.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-manifolds", moduleId: "differential-geometry", code: "GEO.3.12", title: "Introduction to Manifolds", description: "Charts, atlases, smooth manifolds, and the transition to abstract geometry.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-tangent", moduleId: "differential-geometry", code: "GEO.3.13", title: "Tangent Spaces & Vector Fields", description: "Tangent vectors as derivations, vector fields, flows, and the Lie bracket.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-differential-forms", moduleId: "differential-geometry", code: "GEO.3.14", title: "Differential Forms", description: "Exterior algebra, wedge product, exterior derivative, and Stokes' theorem on manifolds.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-gauss-bonnet", moduleId: "differential-geometry", code: "GEO.3.15", title: "Gauss-Bonnet Theorem", description: "Relates total Gaussian curvature of a surface to its Euler characteristic.", nodeType: "application", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "dg-history", moduleId: "differential-geometry", code: "GEO.3.16", title: "History: Gauss, Riemann, Cartan", description: "The evolution of differential geometry from Gauss's surface theory to modern manifolds.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Combinatorics (COM.1) — 16 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "comb-counting", moduleId: "combinatorics", code: "COM.1.1", title: "Basic Counting", description: "Sum and product rules, bijective proofs, and the foundations of enumeration.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "comb-permutations", moduleId: "combinatorics", code: "COM.1.2", title: "Permutations & Combinations", description: "Counting arrangements and selections, with and without repetition.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-binomial", moduleId: "combinatorics", code: "COM.1.3", title: "Binomial Theorem", description: "Binomial coefficients, Pascal's triangle, and the binomial expansion.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-multinomial", moduleId: "combinatorics", code: "COM.1.4", title: "Multinomial Coefficients", description: "Multinomial theorem, counting multiset permutations, and lattice paths.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-inclusion-exclusion", moduleId: "combinatorics", code: "COM.1.5", title: "Inclusion-Exclusion", description: "The inclusion-exclusion principle for counting unions of overlapping sets.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-derangements", moduleId: "combinatorics", code: "COM.1.6", title: "Derangements", description: "Permutations with no fixed points, subfactorials, and their asymptotic behavior.", nodeType: "example", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-pigeonhole", moduleId: "combinatorics", code: "COM.1.7", title: "Pigeonhole Principle", description: "If n+1 objects are placed into n boxes, at least one box contains two objects.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-generating", moduleId: "combinatorics", code: "COM.1.8", title: "Generating Functions", description: "Ordinary and exponential generating functions as tools for counting sequences.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-recurrences", moduleId: "combinatorics", code: "COM.1.9", title: "Solving Recurrences", description: "Using generating functions and the characteristic equation to solve recurrence relations.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-graphs", moduleId: "combinatorics", code: "COM.1.10", title: "Graph Theory Basics", description: "Vertices, edges, degree sequences, paths, cycles, and graph isomorphism.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-trees", moduleId: "combinatorics", code: "COM.1.11", title: "Trees & Spanning Trees", description: "Characterizations of trees, Cayley's formula, and minimum spanning tree algorithms.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-coloring", moduleId: "combinatorics", code: "COM.1.12", title: "Graph Coloring", description: "Vertex and edge coloring, chromatic number, Brooks' theorem, and the chromatic polynomial.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-planar", moduleId: "combinatorics", code: "COM.1.13", title: "Planar Graphs & Euler's Formula", description: "Planar embeddings, Euler's formula V-E+F=2, and Kuratowski's theorem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-matching", moduleId: "combinatorics", code: "COM.1.14", title: "Matchings & Hall's Theorem", description: "Matchings in bipartite graphs, Hall's marriage theorem, and Konig's theorem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-extremal", moduleId: "combinatorics", code: "COM.1.15", title: "Extremal & Ramsey Theory", description: "Turan's theorem, Ramsey numbers, and the interplay between density and structure.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "comb-history", moduleId: "combinatorics", code: "COM.1.16", title: "History of Combinatorics", description: "From Leibniz's Ars Combinatoria to Erdos and modern probabilistic combinatorics.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Mathematical Logic (LOG.1) — 15 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "logic-prop", moduleId: "mathematical-logic", code: "LOG.1.1", title: "Propositional Logic", description: "Connectives, truth tables, tautologies, and the foundations of logical reasoning.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "logic-boolean", moduleId: "mathematical-logic", code: "LOG.1.2", title: "Boolean Algebra", description: "Boolean operations, lattice structure, duality, and applications to logic circuits.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-pred", moduleId: "mathematical-logic", code: "LOG.1.3", title: "Predicate Logic", description: "Quantifiers, free and bound variables, formal proofs in first-order logic.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-models", moduleId: "mathematical-logic", code: "LOG.1.4", title: "Model Theory Basics", description: "Structures, interpretations, satisfaction, and elementary equivalence.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-completeness", moduleId: "mathematical-logic", code: "LOG.1.5", title: "Completeness Theorem", description: "Godel's completeness theorem: every consistent first-order theory has a model.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-compactness", moduleId: "mathematical-logic", code: "LOG.1.6", title: "Compactness Theorem", description: "A set of sentences has a model iff every finite subset does; applications to algebra.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-set", moduleId: "mathematical-logic", code: "LOG.1.7", title: "Set Theory — ZFC", description: "Zermelo-Fraenkel axioms with Choice, the cumulative hierarchy, and consistency.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-ordinals", moduleId: "mathematical-logic", code: "LOG.1.8", title: "Ordinals & Cardinals", description: "Ordinal arithmetic, well-ordering, cardinal numbers, and Cantor's theorem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-continuum", moduleId: "mathematical-logic", code: "LOG.1.9", title: "Continuum Hypothesis", description: "The continuum hypothesis, its independence from ZFC, and forcing.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-choice", moduleId: "mathematical-logic", code: "LOG.1.10", title: "Axiom of Choice", description: "Equivalent formulations, the well-ordering theorem, and paradoxical consequences.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-zorn", moduleId: "mathematical-logic", code: "LOG.1.11", title: "Zorn's Lemma & Applications", description: "Zorn's lemma and its applications to algebra, analysis, and topology.", nodeType: "application", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-godel", moduleId: "mathematical-logic", code: "LOG.1.12", title: "Godel's Incompleteness Theorems", description: "The first and second incompleteness theorems and their foundational implications.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-computability", moduleId: "mathematical-logic", code: "LOG.1.13", title: "Computability & Decidability", description: "Recursive functions, the halting problem, and undecidable theories.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "logic-history", moduleId: "mathematical-logic", code: "LOG.1.14", title: "History: Frege, Russell, Godel", description: "From Frege's Begriffsschrift through Russell's paradox to Godel's revolution.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Proof Writing (LOG.2) — 15 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "pw-logic-basics", moduleId: "proof-writing", code: "LOG.2.1", title: "Logical Foundations", description: "Statements, connectives, truth values, and the language of mathematical proof.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "pw-direct", moduleId: "proof-writing", code: "LOG.2.2", title: "Direct Proof", description: "Proving implications by assuming the hypothesis and deriving the conclusion.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-if-and-only-if", moduleId: "proof-writing", code: "LOG.2.3", title: "If and Only If Proofs", description: "Proving equivalences by establishing both directions of an implication.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-existence", moduleId: "proof-writing", code: "LOG.2.4", title: "Existence Proofs", description: "Proving that an object with desired properties exists, constructively or otherwise.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-constructive", moduleId: "proof-writing", code: "LOG.2.5", title: "Constructive vs Non-constructive", description: "The distinction between proofs that exhibit a witness and those that do not.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-contradiction", moduleId: "proof-writing", code: "LOG.2.6", title: "Proof by Contradiction", description: "Assuming the negation and deriving a contradiction to establish a statement.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-contrapositive", moduleId: "proof-writing", code: "LOG.2.7", title: "Contrapositive", description: "Proving an implication by proving its logically equivalent contrapositive.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-induction", moduleId: "proof-writing", code: "LOG.2.8", title: "Induction", description: "Mathematical induction: base case, inductive step, and the well-ordering principle.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-strong-induction", moduleId: "proof-writing", code: "LOG.2.9", title: "Strong Induction", description: "Using all preceding cases in the inductive step, not just the immediately previous one.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-structural", moduleId: "proof-writing", code: "LOG.2.10", title: "Structural Induction", description: "Induction on recursively defined structures such as trees and formulas.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-cases", moduleId: "proof-writing", code: "LOG.2.11", title: "Proof by Cases", description: "Splitting a proof into exhaustive cases and handling each separately.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-wlog", moduleId: "proof-writing", code: "LOG.2.12", title: "WLOG Arguments", description: "Using symmetry to reduce the number of cases without loss of generality.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-quantifiers", moduleId: "proof-writing", code: "LOG.2.13", title: "Working with Quantifiers", description: "Strategies for proving and disproving statements with universal and existential quantifiers.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-epsilon-delta", moduleId: "proof-writing", code: "LOG.2.14", title: "Epsilon-Delta Proofs", description: "Rigorous limit proofs using the epsilon-delta definition of continuity and convergence.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-writing", moduleId: "proof-writing", code: "LOG.2.15", title: "Writing & Communication", description: "Structuring proofs clearly, choosing notation, and writing for a mathematical audience.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-common-errors", moduleId: "proof-writing", code: "LOG.2.16", title: "Common Errors & Pitfalls", description: "Frequent logical mistakes in proofs: circular reasoning, affirming the consequent, etc.", nodeType: "example", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pw-history", moduleId: "proof-writing", code: "LOG.2.17", title: "History of Mathematical Proof", description: "From Greek deductive reasoning to computer-verified proofs and formalism.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Arithmetic (NUM.1) — 18 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "arith-natural", moduleId: "arithmetic", code: "NUM.1.1", title: "Natural Numbers & Peano", description: "Peano axioms, the successor function, and the construction of natural numbers.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "arith-div", moduleId: "arithmetic", code: "NUM.1.2", title: "Divisibility", description: "Division algorithm, divisibility rules, and basic properties of divisors.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-primes", moduleId: "arithmetic", code: "NUM.1.3", title: "Prime Numbers", description: "Definition, examples, and the central role of primes in number theory.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-sieve", moduleId: "arithmetic", code: "NUM.1.4", title: "Sieve of Eratosthenes", description: "An ancient algorithm for finding all primes up to a given bound.", nodeType: "example", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-fta", moduleId: "arithmetic", code: "NUM.1.5", title: "Fundamental Theorem of Arithmetic", description: "Every integer greater than 1 has a unique prime factorization.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-lcm", moduleId: "arithmetic", code: "NUM.1.6", title: "LCM & Applications", description: "Least common multiple, its relation to GCD, and practical applications.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-infinitude", moduleId: "arithmetic", code: "NUM.1.7", title: "Infinitude of Primes", description: "Euclid's proof and other proofs that there are infinitely many prime numbers.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-gcd", moduleId: "arithmetic", code: "NUM.1.8", title: "GCD & Euclidean Algorithm", description: "Computing the greatest common divisor efficiently using Euclid's algorithm.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-bezout", moduleId: "arithmetic", code: "NUM.1.9", title: "Bezout's Theorem", description: "The GCD of a and b can be written as a linear combination ax + by = gcd(a,b).", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-diophantine", moduleId: "arithmetic", code: "NUM.1.10", title: "Linear Diophantine Equations", description: "Integer solutions of ax + by = c, existence conditions, and parametric solutions.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-modular", moduleId: "arithmetic", code: "NUM.1.11", title: "Modular Arithmetic", description: "Congruences, residue classes, and arithmetic in Z/nZ.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-crt", moduleId: "arithmetic", code: "NUM.1.12", title: "Chinese Remainder Theorem", description: "Solving systems of simultaneous congruences with coprime moduli.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-euler", moduleId: "arithmetic", code: "NUM.1.13", title: "Euler's Theorem", description: "Euler's totient function and the generalization of Fermat's little theorem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-fermat", moduleId: "arithmetic", code: "NUM.1.14", title: "Fermat's Little Theorem", description: "For prime p, a^p is congruent to a mod p; applications to primality testing.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-rsa", moduleId: "arithmetic", code: "NUM.1.15", title: "RSA Cryptography", description: "Public-key encryption based on the difficulty of factoring large integers.", nodeType: "application", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-quadratic-res", moduleId: "arithmetic", code: "NUM.1.16", title: "Quadratic Residues", description: "The Legendre symbol, Euler's criterion, and the structure of quadratic residues.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-reciprocity", moduleId: "arithmetic", code: "NUM.1.17", title: "Quadratic Reciprocity", description: "Gauss's golden theorem relating the solvability of quadratic congruences.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "arith-history", moduleId: "arithmetic", code: "NUM.1.18", title: "History of Number Theory", description: "From Euclid and Diophantus through Fermat, Euler, and Gauss to modern number theory.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Analytic Number Theory (NUM.2) — 15 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "ant-arithmetic-functions", moduleId: "analytic-number-theory", code: "NUM.2.1", title: "Arithmetic Functions", description: "Definitions and properties of common arithmetic functions like tau, sigma, and phi.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "ant-multiplicative", moduleId: "analytic-number-theory", code: "NUM.2.2", title: "Multiplicative Functions", description: "Functions satisfying f(mn)=f(m)f(n) for coprime m,n, and Dirichlet convolution.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-mobius", moduleId: "analytic-number-theory", code: "NUM.2.3", title: "Mobius Function & Inversion", description: "The Mobius function, Mobius inversion formula, and applications to number theory.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-dirichlet", moduleId: "analytic-number-theory", code: "NUM.2.4", title: "Dirichlet Series", description: "Formal and analytic Dirichlet series, abscissa of convergence, and Euler products.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-euler-product", moduleId: "analytic-number-theory", code: "NUM.2.5", title: "Euler Products", description: "Representing Dirichlet series as infinite products over primes.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-zeta", moduleId: "analytic-number-theory", code: "NUM.2.6", title: "Riemann Zeta Function", description: "Definition, basic properties, connection to primes, and the Euler product for zeta.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-analytic-cont", moduleId: "analytic-number-theory", code: "NUM.2.7", title: "Analytic Continuation of zeta", description: "Extending the zeta function to the entire complex plane via analytic continuation.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-functional-eq", moduleId: "analytic-number-theory", code: "NUM.2.8", title: "Functional Equation", description: "The symmetry of the zeta function relating its values at s and 1-s.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-zeros", moduleId: "analytic-number-theory", code: "NUM.2.9", title: "Zeros of zeta & Riemann Hypothesis", description: "Trivial and non-trivial zeros of zeta, the critical strip, and the Riemann Hypothesis.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-primes", moduleId: "analytic-number-theory", code: "NUM.2.10", title: "Prime Number Theorem", description: "The asymptotic distribution of primes: pi(x) ~ x/ln(x) and its proof outline.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-l-functions", moduleId: "analytic-number-theory", code: "NUM.2.11", title: "Dirichlet L-Functions", description: "L-functions attached to Dirichlet characters and their analytic properties.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-primes-ap", moduleId: "analytic-number-theory", code: "NUM.2.12", title: "Primes in Arithmetic Progressions", description: "Dirichlet's theorem: there are infinitely many primes in each coprime residue class.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-summation", moduleId: "analytic-number-theory", code: "NUM.2.13", title: "Abel & Euler-Maclaurin Summation", description: "Summation techniques for estimating arithmetic sums and deriving asymptotic formulas.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ant-history", moduleId: "analytic-number-theory", code: "NUM.2.14", title: "History: Euler, Riemann, Hadamard", description: "The development of analytic number theory from Euler's product to the proof of the PNT.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // History of Mathematics (META.2) — 12 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "hm-ancient", moduleId: "history-of-math", code: "META.2.1", title: "Ancient Mathematics", description: "Babylonian, Egyptian, and early Indian mathematics: number systems and practical geometry.", nodeType: "history", isOptional: true, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "hm-greek", moduleId: "history-of-math", code: "META.2.2", title: "Greek Mathematics", description: "Euclid, Archimedes, Apollonius, and the birth of deductive reasoning.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-islamic", moduleId: "history-of-math", code: "META.2.3", title: "Islamic Golden Age", description: "Al-Khwarizmi, Omar Khayyam, and the development of algebra and algorithms.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-renaissance", moduleId: "history-of-math", code: "META.2.4", title: "Renaissance Algebra", description: "Cardano, Tartaglia, Ferrari, and the solution of cubic and quartic equations.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-calculus-wars", moduleId: "history-of-math", code: "META.2.5", title: "The Calculus Wars", description: "Newton vs Leibniz: the priority dispute and the birth of infinitesimal calculus.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-19th-rigor", moduleId: "history-of-math", code: "META.2.6", title: "19th Century Rigor", description: "Cauchy, Weierstrass, and the rigorous foundations of analysis.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-set-crisis", moduleId: "history-of-math", code: "META.2.7", title: "Foundations Crisis", description: "Russell's paradox, Hilbert's program, and the crisis in mathematical foundations.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-bourbaki", moduleId: "history-of-math", code: "META.2.8", title: "Bourbaki", description: "The Bourbaki group and their ambitious project to reformulate all of mathematics.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-computer", moduleId: "history-of-math", code: "META.2.9", title: "Computer Era", description: "The impact of computers on mathematics: proof assistants, computational methods, and big data.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-women", moduleId: "history-of-math", code: "META.2.10", title: "Women in Mathematics", description: "Hypatia, Noether, Mirzakhani, and the contributions of women throughout mathematical history.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-unsolved", moduleId: "history-of-math", code: "META.2.11", title: "Unsolved Problems", description: "The Millennium Prize Problems and other great open questions in mathematics.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "hm-prizes", moduleId: "history-of-math", code: "META.2.12", title: "Fields Medal & Abel Prize", description: "The most prestigious awards in mathematics, their history, and notable laureates.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Philosophy of Mathematics (META.3) — 10 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "pm-what-is-math", moduleId: "philosophy-of-math", code: "META.3.1", title: "What is Mathematics?", description: "An exploration of the nature of mathematical objects, truth, and knowledge.", nodeType: "history", isOptional: true, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "pm-platonism", moduleId: "philosophy-of-math", code: "META.3.2", title: "Platonism vs Formalism", description: "Do mathematical objects exist independently, or are they purely formal constructs?", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pm-constructivism", moduleId: "philosophy-of-math", code: "META.3.3", title: "Constructivism", description: "Mathematics as mental construction: only objects that can be constructed are real.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pm-logicism", moduleId: "philosophy-of-math", code: "META.3.4", title: "Logicism: Frege & Russell", description: "The program to reduce all of mathematics to pure logic.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pm-intuitionism", moduleId: "philosophy-of-math", code: "META.3.5", title: "Intuitionism: Brouwer", description: "Brouwer's rejection of the law of excluded middle and non-constructive proofs.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pm-structuralism", moduleId: "philosophy-of-math", code: "META.3.6", title: "Structuralism", description: "Mathematics as the study of abstract structures rather than particular objects.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pm-foundations", moduleId: "philosophy-of-math", code: "META.3.7", title: "Foundations Crisis", description: "The early 20th-century crisis over paradoxes, consistency, and the basis of mathematics.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pm-unreasonable", moduleId: "philosophy-of-math", code: "META.3.8", title: "Unreasonable Effectiveness", description: "Wigner's puzzle: why does abstract mathematics describe the physical world so well?", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pm-beauty", moduleId: "philosophy-of-math", code: "META.3.9", title: "Beauty in Mathematics", description: "Aesthetic criteria in mathematics: elegance, surprise, inevitability, and depth.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pm-ethics", moduleId: "philosophy-of-math", code: "META.3.10", title: "Ethics of Mathematics", description: "Responsibility in applications of mathematics: AI, surveillance, finance, and warfare.", nodeType: "history", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Using Lean (META.4) — 10 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "lean-what", moduleId: "using-lean", code: "META.4.1", title: "What is Lean?", description: "An introduction to the Lean proof assistant and its role in formalizing mathematics.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "lean-install", moduleId: "using-lean", code: "META.4.2", title: "Installation & Setup", description: "Installing Lean 4, elan, and VS Code extension for a working development environment.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "lean-syntax", moduleId: "using-lean", code: "META.4.3", title: "Basic Syntax", description: "Lean's type theory, terms, types, functions, and the expression language.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "lean-propositions", moduleId: "using-lean", code: "META.4.4", title: "Propositions & Proofs", description: "The Curry-Howard correspondence: propositions as types and proofs as terms.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "lean-tactics", moduleId: "using-lean", code: "META.4.5", title: "Tactics", description: "Tactic mode in Lean: intro, apply, exact, rw, simp, and building proof scripts.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "lean-nat", moduleId: "using-lean", code: "META.4.6", title: "Natural Numbers in Lean", description: "Defining and working with natural numbers, addition, and basic lemmas in Lean.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "lean-induction", moduleId: "using-lean", code: "META.4.7", title: "Induction in Lean", description: "Performing inductive proofs in Lean using the induction tactic and recursion.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "lean-structures", moduleId: "using-lean", code: "META.4.8", title: "Structures & Classes", description: "Defining mathematical structures and type classes for algebraic hierarchies.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "lean-mathlib", moduleId: "using-lean", code: "META.4.9", title: "Mathlib Overview", description: "Navigating Lean's mathematical library: searching lemmas, contributing, and style guide.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "lean-first-proof", moduleId: "using-lean", code: "META.4.10", title: "Writing Your First Proof", description: "A guided exercise formalizing a simple mathematical theorem in Lean from scratch.", nodeType: "application", isOptional: true, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: ODE (DYN.1) — 4 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "ode-first", moduleId: "ode", code: "DYN.1.1", title: "First Order ODEs", description: "Separation of variables, integrating factors, existence and uniqueness.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "ode-linear", moduleId: "ode", code: "DYN.1.2", title: "Linear ODEs", description: "Constant coefficients, variation of parameters, Wronskian.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ode-systems", moduleId: "ode", code: "DYN.1.3", title: "Systems of ODEs", description: "Matrix exponential, phase portraits, Jordan form applications.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ode-stability", moduleId: "ode", code: "DYN.1.4", title: "Stability", description: "Equilibria, Lyapunov stability, linearization, phase plane analysis.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: PDE (DYN.2) — 4 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "pde-classification", moduleId: "pde", code: "DYN.2.1", title: "Classification", description: "Elliptic, parabolic, hyperbolic PDEs. Characteristics method.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "pde-heat", moduleId: "pde", code: "DYN.2.2", title: "Heat Equation", description: "Fourier series solutions, maximum principle, Green's function.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pde-wave", moduleId: "pde", code: "DYN.2.3", title: "Wave Equation", description: "d'Alembert's formula, energy methods, Huygens' principle.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "pde-laplace", moduleId: "pde", code: "DYN.2.4", title: "Laplace Equation", description: "Harmonic functions, mean value property, Poisson's equation.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Mathematical Physics (PHY.1) — 3 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "mp-variational", moduleId: "mathematical-physics", code: "PHY.1.1", title: "Calculus of Variations", description: "Euler-Lagrange equation, functionals, geodesic problems.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "mp-lagrangian", moduleId: "mathematical-physics", code: "PHY.1.2", title: "Lagrangian Mechanics", description: "Generalized coordinates, constraints, Noether's theorem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "mp-quantum", moduleId: "mathematical-physics", code: "PHY.1.3", title: "Quantum Foundations", description: "Hilbert space formulation, observables, Schrodinger equation.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Theory of Computation (CSC.1) — 4 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "toc-automata", moduleId: "theory-of-computation", code: "CSC.1.1", title: "Finite Automata", description: "DFA, NFA, regular languages, pumping lemma.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "toc-cfg", moduleId: "theory-of-computation", code: "CSC.1.2", title: "Context-Free Languages", description: "CFGs, pushdown automata, parsing, Chomsky normal form.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "toc-turing", moduleId: "theory-of-computation", code: "CSC.1.3", title: "Turing Machines", description: "Definition, Church-Turing thesis, decidability, halting problem.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "toc-complexity", moduleId: "theory-of-computation", code: "CSC.1.4", title: "Complexity Theory", description: "P, NP, NP-completeness, Cook-Levin theorem, reductions.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Information Theory (INF.1) — 3 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "it-entropy", moduleId: "information-theory", code: "INF.1.1", title: "Entropy", description: "Shannon entropy, joint and conditional entropy, mutual information.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "it-coding", moduleId: "information-theory", code: "INF.1.2", title: "Source Coding", description: "Huffman coding, Shannon's source coding theorem, Kraft inequality.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "it-channel", moduleId: "information-theory", code: "INF.1.3", title: "Channel Capacity", description: "Noisy channels, Shannon's channel coding theorem, error correction.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Probability (PRB.1) — 4 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "prob-spaces", moduleId: "probability", code: "PRB.1.1", title: "Probability Spaces", description: "Sigma-algebras, probability measures, conditional probability, independence.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "prob-random", moduleId: "probability", code: "PRB.1.2", title: "Random Variables", description: "Distributions, expectation, variance, moment generating functions.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "prob-convergence", moduleId: "probability", code: "PRB.1.3", title: "Convergence", description: "Almost sure, in probability, in distribution. Law of large numbers.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "prob-clt", moduleId: "probability", code: "PRB.1.4", title: "Central Limit Theorem", description: "CLT statement and proof sketch, applications, Berry-Esseen bound.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Statistics (PRB.2) — 4 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "stat-estimation", moduleId: "statistics", code: "PRB.2.1", title: "Estimation", description: "Point estimation, maximum likelihood, method of moments, bias and MSE.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "stat-testing", moduleId: "statistics", code: "PRB.2.2", title: "Hypothesis Testing", description: "Neyman-Pearson, p-values, Type I/II errors, power of a test.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "stat-regression", moduleId: "statistics", code: "PRB.2.3", title: "Regression", description: "Linear regression, least squares, R-squared, multiple regression.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "stat-bayesian", moduleId: "statistics", code: "PRB.2.4", title: "Bayesian Methods", description: "Prior and posterior, conjugate priors, MCMC, Bayesian vs frequentist.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Game Theory (GAM.1) — 3 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "gt-strategic", moduleId: "game-theory", code: "GAM.1.1", title: "Strategic Games", description: "Normal form, dominant strategies, best response, iterated elimination.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "gt-nash", moduleId: "game-theory", code: "GAM.1.2", title: "Nash Equilibrium", description: "Existence theorem, mixed strategies, computation.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "gt-extensive", moduleId: "game-theory", code: "GAM.1.3", title: "Extensive Games", description: "Game trees, subgame perfection, backward induction.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Operations Research (OPR.1) — 3 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "or-lp", moduleId: "operations-research", code: "OPR.1.1", title: "Linear Programming", description: "Feasible regions, simplex method, duality, complementary slackness.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "or-integer", moduleId: "operations-research", code: "OPR.1.2", title: "Integer Programming", description: "Branch and bound, cutting planes, TSP formulations.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "or-network", moduleId: "operations-research", code: "OPR.1.3", title: "Network Flows", description: "Max-flow min-cut, shortest paths, minimum spanning trees.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },

  // ───────────────────────────────────────────────────────────────────────
  // Meta-Skills: Problem Solving (META.1) — 4 nodes
  // ───────────────────────────────────────────────────────────────────────
  { id: "ps-polya", moduleId: "problem-solving", code: "META.1.1", title: "Polya's Method", description: "Understand, Plan, Execute, Review: the universal problem-solving framework.", nodeType: "core", isOptional: false, status: "available", xp: 0, posX: 0, posY: 0 },
  { id: "ps-simplify", moduleId: "problem-solving", code: "META.1.2", title: "Simplify the Problem", description: "Reduce to a smaller case, add hypotheses, look at special values.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ps-invariants", moduleId: "problem-solving", code: "META.1.3", title: "Invariants", description: "Find quantities that don't change. Monovariants and conservation laws.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
  { id: "ps-pigeonhole", moduleId: "problem-solving", code: "META.1.4", title: "Pigeonhole Principle", description: "If n+1 pigeons go into n holes, some hole has at least 2. Surprisingly powerful.", nodeType: "core", isOptional: false, status: "locked", xp: 0, posX: 0, posY: 0 },
];

// ═══════════════════════════════════════════════════════════════════════════
//  EDGES
// ═══════════════════════════════════════════════════════════════════════════

export const OTHER_EDGES: EdgeData[] = [
  // ───────────────────────────────────────────────────────────────────────
  // Euclidean Geometry (GEO.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "euclidean-geometry", sourceId: "eg-axioms", targetId: "eg-triangles", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-triangles", targetId: "eg-similarity", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-similarity", targetId: "eg-trigonometry", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-similarity", targetId: "eg-circles", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-circles", targetId: "eg-inversions", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-triangles", targetId: "eg-remarkable", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-remarkable", targetId: "eg-euler-line", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-triangles", targetId: "eg-area", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-axioms", targetId: "eg-transformations", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-transformations", targetId: "eg-isometries", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-transformations", targetId: "eg-similarities", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-axioms", targetId: "eg-conics", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-conics", targetId: "eg-conics-projective", type: "prerequisite" },
  { moduleId: "euclidean-geometry", sourceId: "eg-axioms", targetId: "eg-constructions", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Topology (GEO.2)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "topology", sourceId: "top-spaces", targetId: "top-bases", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-bases", targetId: "top-product", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-spaces", targetId: "top-continuity", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-continuity", targetId: "top-quotient", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-spaces", targetId: "top-separation", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-spaces", targetId: "top-compact", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-compact", targetId: "top-tychonoff", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-compact", targetId: "top-locally-compact", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-spaces", targetId: "top-connected", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-connected", targetId: "top-path-connected", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-spaces", targetId: "top-metric", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-compact", targetId: "top-fundamental", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-connected", targetId: "top-fundamental", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-fundamental", targetId: "top-covering", type: "prerequisite" },
  { moduleId: "topology", sourceId: "top-fundamental", targetId: "top-van-kampen", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Differential Geometry (GEO.3)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "differential-geometry", sourceId: "dg-curves", targetId: "dg-curvature-2d", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-curvature-2d", targetId: "dg-frenet", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-curves", targetId: "dg-surfaces", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-surfaces", targetId: "dg-first-ff", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-first-ff", targetId: "dg-second-ff", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-second-ff", targetId: "dg-gauss-curvature", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-gauss-curvature", targetId: "dg-theorema", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-second-ff", targetId: "dg-mean-curvature", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-first-ff", targetId: "dg-geodesics", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-surfaces", targetId: "dg-gauss-map", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-curves", targetId: "dg-manifolds", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-manifolds", targetId: "dg-tangent", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-tangent", targetId: "dg-differential-forms", type: "prerequisite" },
  { moduleId: "differential-geometry", sourceId: "dg-gauss-curvature", targetId: "dg-gauss-bonnet", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Combinatorics (COM.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "combinatorics", sourceId: "comb-counting", targetId: "comb-permutations", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-permutations", targetId: "comb-binomial", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-binomial", targetId: "comb-multinomial", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-permutations", targetId: "comb-inclusion-exclusion", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-inclusion-exclusion", targetId: "comb-derangements", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-counting", targetId: "comb-pigeonhole", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-counting", targetId: "comb-generating", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-generating", targetId: "comb-recurrences", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-counting", targetId: "comb-graphs", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-graphs", targetId: "comb-trees", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-graphs", targetId: "comb-coloring", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-coloring", targetId: "comb-planar", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-graphs", targetId: "comb-matching", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-generating", targetId: "comb-extremal", type: "prerequisite" },
  { moduleId: "combinatorics", sourceId: "comb-graphs", targetId: "comb-extremal", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Mathematical Logic (LOG.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "mathematical-logic", sourceId: "logic-prop", targetId: "logic-boolean", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-prop", targetId: "logic-pred", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-pred", targetId: "logic-models", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-pred", targetId: "logic-completeness", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-pred", targetId: "logic-compactness", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-pred", targetId: "logic-set", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-set", targetId: "logic-ordinals", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-ordinals", targetId: "logic-continuum", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-set", targetId: "logic-choice", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-choice", targetId: "logic-zorn", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-prop", targetId: "logic-godel", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-set", targetId: "logic-godel", type: "prerequisite" },
  { moduleId: "mathematical-logic", sourceId: "logic-prop", targetId: "logic-computability", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Proof Writing (LOG.2)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "proof-writing", sourceId: "pw-logic-basics", targetId: "pw-direct", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-direct", targetId: "pw-if-and-only-if", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-direct", targetId: "pw-existence", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-existence", targetId: "pw-constructive", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-logic-basics", targetId: "pw-contradiction", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-contradiction", targetId: "pw-contrapositive", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-logic-basics", targetId: "pw-induction", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-induction", targetId: "pw-strong-induction", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-induction", targetId: "pw-structural", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-logic-basics", targetId: "pw-cases", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-cases", targetId: "pw-wlog", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-logic-basics", targetId: "pw-quantifiers", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-quantifiers", targetId: "pw-epsilon-delta", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-logic-basics", targetId: "pw-writing", type: "prerequisite" },
  { moduleId: "proof-writing", sourceId: "pw-writing", targetId: "pw-common-errors", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Arithmetic (NUM.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "arithmetic", sourceId: "arith-natural", targetId: "arith-div", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-div", targetId: "arith-primes", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-primes", targetId: "arith-sieve", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-primes", targetId: "arith-fta", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-fta", targetId: "arith-lcm", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-primes", targetId: "arith-infinitude", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-div", targetId: "arith-gcd", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-gcd", targetId: "arith-bezout", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-bezout", targetId: "arith-diophantine", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-natural", targetId: "arith-modular", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-gcd", targetId: "arith-modular", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-modular", targetId: "arith-crt", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-modular", targetId: "arith-euler", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-euler", targetId: "arith-fermat", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-fermat", targetId: "arith-rsa", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-modular", targetId: "arith-quadratic-res", type: "prerequisite" },
  { moduleId: "arithmetic", sourceId: "arith-quadratic-res", targetId: "arith-reciprocity", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Analytic Number Theory (NUM.2)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "analytic-number-theory", sourceId: "ant-arithmetic-functions", targetId: "ant-multiplicative", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-multiplicative", targetId: "ant-mobius", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-multiplicative", targetId: "ant-dirichlet", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-dirichlet", targetId: "ant-euler-product", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-euler-product", targetId: "ant-zeta", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-zeta", targetId: "ant-analytic-cont", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-analytic-cont", targetId: "ant-functional-eq", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-zeta", targetId: "ant-zeros", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-zeta", targetId: "ant-primes", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-dirichlet", targetId: "ant-l-functions", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-l-functions", targetId: "ant-primes-ap", type: "prerequisite" },
  { moduleId: "analytic-number-theory", sourceId: "ant-arithmetic-functions", targetId: "ant-summation", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // History of Mathematics (META.2)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "history-of-math", sourceId: "hm-ancient", targetId: "hm-greek", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-greek", targetId: "hm-islamic", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-islamic", targetId: "hm-renaissance", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-renaissance", targetId: "hm-calculus-wars", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-calculus-wars", targetId: "hm-19th-rigor", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-19th-rigor", targetId: "hm-set-crisis", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-set-crisis", targetId: "hm-bourbaki", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-bourbaki", targetId: "hm-computer", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-ancient", targetId: "hm-women", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-ancient", targetId: "hm-unsolved", type: "prerequisite" },
  { moduleId: "history-of-math", sourceId: "hm-ancient", targetId: "hm-prizes", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Philosophy of Mathematics (META.3)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "philosophy-of-math", sourceId: "pm-what-is-math", targetId: "pm-platonism", type: "prerequisite" },
  { moduleId: "philosophy-of-math", sourceId: "pm-platonism", targetId: "pm-constructivism", type: "prerequisite" },
  { moduleId: "philosophy-of-math", sourceId: "pm-platonism", targetId: "pm-logicism", type: "prerequisite" },
  { moduleId: "philosophy-of-math", sourceId: "pm-logicism", targetId: "pm-intuitionism", type: "prerequisite" },
  { moduleId: "philosophy-of-math", sourceId: "pm-platonism", targetId: "pm-structuralism", type: "prerequisite" },
  { moduleId: "philosophy-of-math", sourceId: "pm-what-is-math", targetId: "pm-foundations", type: "prerequisite" },
  { moduleId: "philosophy-of-math", sourceId: "pm-what-is-math", targetId: "pm-unreasonable", type: "prerequisite" },
  { moduleId: "philosophy-of-math", sourceId: "pm-what-is-math", targetId: "pm-beauty", type: "prerequisite" },
  { moduleId: "philosophy-of-math", sourceId: "pm-what-is-math", targetId: "pm-ethics", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Using Lean (META.4)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "using-lean", sourceId: "lean-what", targetId: "lean-install", type: "prerequisite" },
  { moduleId: "using-lean", sourceId: "lean-install", targetId: "lean-syntax", type: "prerequisite" },
  { moduleId: "using-lean", sourceId: "lean-syntax", targetId: "lean-propositions", type: "prerequisite" },
  { moduleId: "using-lean", sourceId: "lean-propositions", targetId: "lean-tactics", type: "prerequisite" },
  { moduleId: "using-lean", sourceId: "lean-tactics", targetId: "lean-nat", type: "prerequisite" },
  { moduleId: "using-lean", sourceId: "lean-nat", targetId: "lean-induction", type: "prerequisite" },
  { moduleId: "using-lean", sourceId: "lean-tactics", targetId: "lean-structures", type: "prerequisite" },
  { moduleId: "using-lean", sourceId: "lean-syntax", targetId: "lean-mathlib", type: "prerequisite" },
  { moduleId: "using-lean", sourceId: "lean-what", targetId: "lean-first-proof", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: ODE (DYN.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "ode", sourceId: "ode-first", targetId: "ode-linear", type: "prerequisite" },
  { moduleId: "ode", sourceId: "ode-linear", targetId: "ode-systems", type: "prerequisite" },
  { moduleId: "ode", sourceId: "ode-systems", targetId: "ode-stability", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: PDE (DYN.2)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "pde", sourceId: "pde-classification", targetId: "pde-heat", type: "prerequisite" },
  { moduleId: "pde", sourceId: "pde-classification", targetId: "pde-wave", type: "prerequisite" },
  { moduleId: "pde", sourceId: "pde-classification", targetId: "pde-laplace", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Mathematical Physics (PHY.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "mathematical-physics", sourceId: "mp-variational", targetId: "mp-lagrangian", type: "prerequisite" },
  { moduleId: "mathematical-physics", sourceId: "mp-lagrangian", targetId: "mp-quantum", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Theory of Computation (CSC.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "theory-of-computation", sourceId: "toc-automata", targetId: "toc-cfg", type: "prerequisite" },
  { moduleId: "theory-of-computation", sourceId: "toc-cfg", targetId: "toc-turing", type: "prerequisite" },
  { moduleId: "theory-of-computation", sourceId: "toc-turing", targetId: "toc-complexity", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Information Theory (INF.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "information-theory", sourceId: "it-entropy", targetId: "it-coding", type: "prerequisite" },
  { moduleId: "information-theory", sourceId: "it-entropy", targetId: "it-channel", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Probability (PRB.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "probability", sourceId: "prob-spaces", targetId: "prob-random", type: "prerequisite" },
  { moduleId: "probability", sourceId: "prob-random", targetId: "prob-convergence", type: "prerequisite" },
  { moduleId: "probability", sourceId: "prob-convergence", targetId: "prob-clt", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Statistics (PRB.2)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "statistics", sourceId: "stat-estimation", targetId: "stat-testing", type: "prerequisite" },
  { moduleId: "statistics", sourceId: "stat-estimation", targetId: "stat-regression", type: "prerequisite" },
  { moduleId: "statistics", sourceId: "stat-testing", targetId: "stat-bayesian", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Game Theory (GAM.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "game-theory", sourceId: "gt-strategic", targetId: "gt-nash", type: "prerequisite" },
  { moduleId: "game-theory", sourceId: "gt-nash", targetId: "gt-extensive", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Applied Math: Operations Research (OPR.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "operations-research", sourceId: "or-lp", targetId: "or-integer", type: "prerequisite" },
  { moduleId: "operations-research", sourceId: "or-lp", targetId: "or-network", type: "prerequisite" },

  // ───────────────────────────────────────────────────────────────────────
  // Meta-Skills: Problem Solving (META.1)
  // ───────────────────────────────────────────────────────────────────────
  { moduleId: "problem-solving", sourceId: "ps-polya", targetId: "ps-simplify", type: "prerequisite" },
  { moduleId: "problem-solving", sourceId: "ps-polya", targetId: "ps-invariants", type: "prerequisite" },
  { moduleId: "problem-solving", sourceId: "ps-simplify", targetId: "ps-pigeonhole", type: "prerequisite" },
];
