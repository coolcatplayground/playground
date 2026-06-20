// ============================================================
// GAME DATA — Plant Evolution Idle Game
// Real evolutionary science as the backbone, with optional
// speculative "what if" branches layered on top.
// ============================================================

const STAGES = [
  {
    id: "cyanobacteria",
    name: "Cyanobacteria",
    emoji: "🦠",
    threshold: 0, // light energy required to BE here (stage 0 = start)
    fact: "Cyanobacteria were among the first organisms to perform photosynthesis, around 2.7 billion years ago. They're responsible for the 'Great Oxidation Event' that filled Earth's atmosphere with oxygen.",
    flavor: "A single-celled photosynthesizer floating in ancient water. Humble beginnings."
  },
  {
    id: "algae",
    name: "Green Algae",
    emoji: "🟢",
    threshold: 50,
    fact: "Green algae (Charophyta) are the closest living relatives of land plants. All land plants descend from a freshwater algal ancestor.",
    flavor: "Multicellular now, drifting in sunlit shallows. The blueprint for everything green that follows."
  },
  {
    id: "moss",
    name: "Moss",
    emoji: "🌱",
    threshold: 250,
    fact: "Mosses were among the first plants to colonize land, around 470 million years ago. They have no true roots — just rhizoids — and no vascular tissue to move water internally.",
    flavor: "Land! No roots yet, no real stems — just a low green carpet hugging the wet ground."
  },
  {
    id: "fern",
    name: "Fern",
    emoji: "🌿",
    threshold: 1200,
    fact: "Ferns evolved vascular tissue (xylem and phloem), letting them grow taller by transporting water and nutrients internally. They reproduce via spores, not seeds.",
    flavor: "Real stems, real height. Water now travels inside the plant instead of just soaking through it."
  },
  {
    id: "conifer",
    name: "Conifer",
    emoji: "🌲",
    threshold: 6000,
    fact: "Conifers (gymnosperms) were the first plants to evolve seeds, around 350 million years ago. A seed protects the embryo and carries its own food supply — a huge survival upgrade over spores.",
    flavor: "Seeds change everything. An embryo wrapped in protection and rations, ready to wait out a bad season."
  },
  {
    id: "flowering",
    name: "Flowering Plant",
    emoji: "🌸",
    threshold: 30000,
    fact: "Angiosperms (flowering plants) appeared roughly 130 million years ago and now make up about 90% of all living plant species. Their success is tied to co-evolution with pollinators like insects.",
    flavor: "Flowers, fruit, color, scent — a plant that advertises and trades resources with animals to spread itself."
  },
  {
    id: "specialized",
    name: "Specialized Modern Plant",
    emoji: "🌳",
    threshold: 150000,
    fact: "Modern plants show extreme specialization: C4 photosynthesis (like corn) evolved independently dozens of times as a more efficient carbon-fixing pathway in hot, dry climates. Carnivorous plants like Venus flytraps evolved to get nitrogen from prey instead of soil.",
    flavor: "The cutting edge of 400+ million years of plant evolution. Every adaptation here exists for a precise reason."
  }
];

// Idle generators — each themed to real plant biology.
// cost scales with count owned; each produces lightPerSecond.
const GENERATORS = [
  {
    id: "chlorophyll",
    name: "Chlorophyll Boost",
    emoji: "🟩",
    baseCost: 15,
    baseProduction: 0.1,
    unlockStage: 0,
    fact: "Chlorophyll absorbs red and blue light but reflects green — which is why plants look green to us."
  },
  {
    id: "rhizoid",
    name: "Rhizoid Patch",
    emoji: "🕸️",
    baseCost: 100,
    baseProduction: 1,
    unlockStage: 2,
    fact: "Rhizoids are thread-like structures mosses use to anchor to surfaces — simpler than true roots, with no internal vascular tissue."
  },
  {
    id: "vascular",
    name: "Vascular Bundle",
    emoji: "🟫",
    baseCost: 600,
    baseProduction: 6,
    unlockStage: 3,
    fact: "Xylem carries water upward from roots; phloem carries sugars made in leaves to the rest of the plant. Together they let plants grow far taller than mosses ever could."
  },
  {
    id: "cone",
    name: "Seed Cone",
    emoji: "🌰",
    baseCost: 3500,
    baseProduction: 35,
    unlockStage: 4,
    fact: "A pine cone's scales open and close in response to humidity, releasing seeds mainly during dry, windy conditions when they'll travel farthest."
  },
  {
    id: "pollinator",
    name: "Pollinator Partnership",
    emoji: "🐝",
    baseCost: 20000,
    baseProduction: 200,
    unlockStage: 5,
    fact: "Roughly 80% of flowering plants rely on animal pollinators. This is one of the most successful co-evolutionary partnerships in the history of life."
  },
  {
    id: "c4",
    name: "C4 Carbon Pathway",
    emoji: "⚙️",
    baseCost: 120000,
    baseProduction: 1100,
    unlockStage: 6,
    fact: "C4 photosynthesis concentrates CO2 before fixing it, dramatically reducing water loss. It evolved independently in over 60 plant lineages — a textbook case of convergent evolution."
  }
];

// Speculative branches — optional, fantastical, clearly flagged as imagination.
// Each unlocks once you reach a certain stage, costs light energy, and grants
// a fun (non-essential) bonus or cosmetic change.
const SPECULATIVE_BRANCHES = [
  {
    id: "bioluminescent_moss",
    name: "Bioluminescent Moss",
    emoji: "✨",
    requiresStage: "moss",
    cost: 800,
    isSpeculative: true,
    description: "SPECULATIVE: What if moss evolved bioluminescence to attract nocturnal spore-dispersing insects, the way some fungi (like Mycena) actually do?",
    effect: "+10% light energy generation at night-themed milestones (flavor bonus: +5% global production)",
    productionMultiplier: 1.05
  },
  {
    id: "giant_fern",
    name: "Towering Fern Revival",
    emoji: "🦕",
    requiresStage: "fern",
    cost: 4000,
    isSpeculative: true,
    description: "SPECULATIVE: Real tree-sized ferns (like Psaronius) existed 300 million years ago and went extinct. What if that lineage never died out?",
    effect: "+8% global light production",
    productionMultiplier: 1.08
  },
  {
    id: "mobile_seeds",
    name: "Self-Propelled Seeds",
    emoji: "🚀",
    requiresStage: "conifer",
    cost: 25000,
    isSpeculative: true,
    description: "SPECULATIVE: What if seeds evolved a primitive muscular pulse, like a tumbleweed with intent, to actively seek better soil instead of waiting for wind?",
    effect: "+10% global light production",
    productionMultiplier: 1.10
  },
  {
    id: "color_shift_flowers",
    name: "Color-Shifting Flowers",
    emoji: "🌈",
    requiresStage: "flowering",
    cost: 100000,
    isSpeculative: true,
    description: "SPECULATIVE: Some real flowers already shift UV patterns invisible to us. What if a lineage evolved full visible-spectrum color shifting to attract a wider range of pollinators across seasons?",
    effect: "+12% global light production",
    productionMultiplier: 1.12
  },
  {
    id: "future_plant",
    name: "The Far-Future Plant",
    emoji: "🪐",
    requiresStage: "specialized",
    cost: 600000,
    isSpeculative: true,
    description: "SPECULATIVE: A purely imaginative leap beyond today's science — a plant adapted for extreme environments we associate with science fiction (low light, high radiation, minimal water). Pure speculation, not a real prediction.",
    effect: "+20% global light production",
    productionMultiplier: 1.20
  }
];

if (typeof module !== "undefined") {
  module.exports = { STAGES, GENERATORS, SPECULATIVE_BRANCHES };
}
