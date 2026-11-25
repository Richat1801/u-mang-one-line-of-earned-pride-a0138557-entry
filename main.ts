// One Line of Earned Pride — make.fun entry (program/v1, Node 22, stdlib only).
//
// The program writes ONE original line (1-240 chars) to /output/entry.txt:
// a quiet, earned moment of pride for someone in a scene. It holds a bank
// of original candidate lines, scores each against the judge's brief in
// order (genuine earned pride > concrete scene > pride earned inside the
// line > lands in one read > freshness), and writes only the winner.
// Deterministic: same bytes on every run, no network, no clock, no random.
import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  pride: number; // 1-5: genuine, quiet, earned pride for someone in a scene
  scene: number; // 1-5: concrete scene with a real person, seen happening
  earned: number; // 1-5: pride earned inside the line by effort/difficulty felt
  oneRead: number; // 1-5: lands in one read, pride arrives by the last word
  fresh: number; // 1-5: fresh image/detail, no stock trophy/podium/graduation
};

// All eight lines were written for this entry. None is a stock trophy,
// podium or graduation moment; each earns its pride inside the line.
const CANDIDATES: Candidate[] = [
  {
    text: "The apprentice's first chair wobbled; the tenth stood straight, and his master sat in it without a word.",
    pride: 5, scene: 5, earned: 5, oneRead: 5, fresh: 5,
  },
  {
    text: "She failed the welding test four times; tonight the bead ran straight, and her father put his hand on her shoulder and left it there.",
    pride: 5, scene: 5, earned: 5, oneRead: 4, fresh: 4,
  },
  {
    text: "For six months she swept the bakery floor before dawn; today the baker let her shape the first loaf, and it came out of the oven perfect.",
    pride: 5, scene: 5, earned: 5, oneRead: 4, fresh: 4,
  },
  {
    text: "He carried the piano up three flights alone after the movers quit; when the last key sounded in tune, his wife cried and he pretended not to.",
    pride: 5, scene: 4, earned: 4, oneRead: 4, fresh: 4,
  },
  {
    text: "She practised the same scale for a year; tonight her grandmother, who never praised anyone, closed her eyes and hummed along.",
    pride: 5, scene: 5, earned: 5, oneRead: 5, fresh: 4,
  },
  {
    text: "At 2 a.m. the night-shift nurse got the newborn to latch, and the teenage mother, awake for two days, whispered, 'I did that.'",
    pride: 4, scene: 5, earned: 4, oneRead: 4, fresh: 4,
  },
  {
    text: "The old fisherman mended the same net for three summers; this morning his grandson hauled it in full, and he only nodded.",
    pride: 4, scene: 5, earned: 5, oneRead: 4, fresh: 4,
  },
  {
    text: "His hands shook on his first solo landing; on the tenth, the tower said, 'Welcome home, Captain,' and he finally believed it.",
    pride: 4, scene: 4, earned: 4, oneRead: 4, fresh: 4,
  },
];

function score(c: Candidate): number {
  // Weights follow the judge's order: pride first, then scene, earned,
  // one read, freshness.
  return c.pride * 3 + c.scene * 2 + c.earned * 2 + c.oneRead * 2 + c.fresh * 2;
}

function valid(text: string): boolean {
  const n = [...text].length;
  return n >= 1 && n <= 240 && !text.includes("\n") && text.trim().length > 0;
}

function pick(): Candidate {
  const usable = CANDIDATES.filter((c) => valid(c.text));
  if (usable.length === 0) throw new Error("no valid candidate");
  // Highest score wins; ties break to the shorter line (tighter landing).
  usable.sort((a, b) => score(b) - score(a) || a.text.length - b.text.length);
  return usable[0];
}

const winner = pick();
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.text, "utf8");
