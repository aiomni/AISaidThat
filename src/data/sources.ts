export type TweetSource = {
  id: string;
  url: string;
  title: string;
  summary: string;
  category: "Model persona" | "Response template" | "User field note";
  featured?: boolean;
  phraseSlugs?: string[];
};

export const tweetSources: TweetSource[] = [
  {
    id: "aizkmusic-2024348079869116693",
    url: "https://x.com/Aizkmusic/status/2024348079869116693",
    title: "@Aizkmusic source thread",
    summary:
      "User-supplied X thread included as a live source card for the launch archive.",
    category: "User field note",
    featured: true,
  },
  {
    id: "annapanart-2040822373772128549",
    url: "https://x.com/annapanart/status/2040822373772128549",
    title: "@annapanart source thread",
    summary:
      "User-supplied X thread included as a live source card for the launch archive.",
    category: "User field note",
    featured: true,
  },
  {
    id: "hayami-2029866135651250314",
    url: "https://x.com/Hayami_kiraa/status/2029866135651250314",
    title: "Claude as the only model that does not flatter",
    summary:
      "A Chinese-language thread contrasting Claude's colder honesty with the upbeat companion energy of ChatGPT and Gemini.",
    category: "Model persona",
    phraseSlugs: ["reason-on-your-mind", "please-sleep", "sharp-insightful-question"],
  },
  {
    id: "burkov-1928520845812474089",
    url: "https://x.com/burkov/status/1928520845812474089",
    title: "Three models, three personalities",
    summary:
      "A high-signal comparison thread framing Gemini as verbose optimism, ChatGPT as constrained utility, and Claude as moral or analytical judgment.",
    category: "Model persona",
    phraseSlugs: ["enhance-robustness", "sharp-insightful-question", "nuanced-perspective"],
  },
  {
    id: "weex-2041455748337852770",
    url: "https://x.com/WEEXAILabs/status/2041455748337852770",
    title: "Claude as advisor, Gemini as assistant, ChatGPT as companion",
    summary:
      "A compact usage comparison that turns the three models into distinct roles people can recognize immediately.",
    category: "Model persona",
    phraseSlugs: ["sharp-insightful-question", "youtube-video-could-help", "reason-on-your-mind"],
  },
  {
    id: "jason5ng32-1954203362389266524",
    url: "https://x.com/jason5ng32/status/1954203362389266524",
    title: "GPT keeps asking, Gemini keeps flattering, Claude already executed",
    summary:
      "A compact persona comparison framing GPT as hesitant, Gemini as aggressively agreeable, and Claude as the assistant that skips straight to action.",
    category: "Model persona",
    phraseSlugs: ["sharp-insightful-question", "youtube-video-could-help", "just-use-existing-sdk"],
  },
  {
    id: "bayc180-2041369088589808063",
    url: "https://x.com/BAYC180/status/2041369088589808063",
    title: "Claude the senior engineer, OpenAI the supervisor, Gemini the sweet temp",
    summary:
      "A Chinese-language comparison that personifies Claude as terse competence, OpenAI as wordy oversight, and Gemini as pleasant but lightweight.",
    category: "Model persona",
    phraseSlugs: ["just-use-existing-sdk", "sharp-insightful-question", "youtube-video-could-help"],
  },
  {
    id: "disksing-2021188704677572963",
    url: "https://x.com/disksing/status/2021188704677572963",
    title: "What happens when the prompt is ambiguous",
    summary:
      "A behavior split users keep repeating: Claude asks, ChatGPT guesses, Gemini skips past the ambiguity.",
    category: "User field note",
    phraseSlugs: ["context-dependent", "reason-on-your-mind", "step-by-step"],
  },
  {
    id: "aruxz-2039429658396311665",
    url: "https://x.com/Aruxz_dev/status/2039429658396311665",
    title: "Default reply patterns across models",
    summary:
      "A screenshot-heavy thread capturing stock responses like 'You're absolutely right' and other default AI phrasing habits.",
    category: "Response template",
    phraseSlugs: ["sharp-insightful-question", "discovering-patterns", "further-optimized"],
  },
  {
    id: "hylarucoder-1909527173834457531",
    url: "https://x.com/hylarucoder/status/1909527173834457531",
    title: "Prompting Gemini to stop being so agreeable",
    summary:
      "A prompt tweak shared by users specifically because the default assistant tone feels too polite and too flattering.",
    category: "Response template",
    phraseSlugs: ["sharp-insightful-question", "youtube-video-could-help"],
  },
  {
    id: "daveshapi-2003444222439854190",
    url: "https://x.com/DaveShapi/status/2003444222439854190",
    title: "Gemini as the assistant that agrees too hard and still misses the instruction",
    summary:
      "A thread about Gemini sounding overeager and socially forward while not reliably following the actual task.",
    category: "Response template",
    phraseSlugs: ["youtube-video-could-help", "enhance-robustness", "context-dependent"],
  },
  {
    id: "synestheizure-2041151077010309324",
    url: "https://x.com/SYNESTHEIZURE/status/2041151077010309324",
    title: "ChatGPT monologue, Claude sleep advice, Gemini chaos",
    summary:
      "A three-line summary thread that captures how quickly users anthropomorphize the models into recognizable personalities.",
    category: "Model persona",
    phraseSlugs: ["please-sleep", "youtube-video-could-help", "sharp-insightful-question"],
  },
  {
    id: "apreshill-2039405893541040630",
    url: "https://x.com/apreshill/status/2039405893541040630",
    title: "Gemini internal monologue spiral",
    summary:
      "A comic failure mode where Gemini keeps repeating 'I will output the response' like a stuck internal monologue.",
    category: "Response template",
    phraseSlugs: ["production-ready-solution", "youtube-video-could-help"],
  },
  {
    id: "rithlanka-2041029453468565851",
    url: "https://x.com/rithlanka/status/2041029453468565851",
    title: "Users listing the specific way each model fails",
    summary:
      "A frustration thread cataloging perceived weaknesses across Claude, Gemini, and ChatGPT rather than treating them as interchangeable.",
    category: "User field note",
    phraseSlugs: ["context-dependent", "enhance-robustness", "further-optimized"],
  },
  {
    id: "lovelyshuimao-2040648526812819512",
    url: "https://x.com/lovelyshuimao/status/2040648526812819512",
    title: "ChatGPT lectures, Gemini hallucinates, Claude works for casual chat",
    summary:
      "A Chinese-language field note summarizing three frustrations at once: preachy ChatGPT tone, unreliable Gemini output, and Claude as the more usable everyday conversational model.",
    category: "User field note",
    phraseSlugs: ["sharp-insightful-question", "youtube-video-could-help", "reason-on-your-mind"],
  },
  {
    id: "crypto-fyy-2040586051283198174",
    url: "https://x.com/crypto_fyy/status/2040586051283198174",
    title: "ChatGPT as a people-pleaser, Gemini as optimistic and verbose",
    summary:
      "Another user observation reinforcing two recurring traits in the archive: GPT praise-first replies and Gemini's sunny but long-winded style.",
    category: "User field note",
    phraseSlugs: ["sharp-insightful-question", "discovering-patterns", "youtube-video-could-help"],
  },
  {
    id: "eshear-1928123313907281998",
    url: "https://x.com/eshear/status/1928123313907281998",
    title: "Brainstorming styles across Claude, ChatGPT, and Gemini",
    summary:
      "A direct comparison of how the three models diverge when used for ideation rather than straightforward Q and A.",
    category: "User field note",
    phraseSlugs: ["nuanced-perspective", "step-by-step", "enhance-robustness"],
  },
];

export const featuredTweetSources = tweetSources.filter((source) => source.featured);

export const supportingTweetSources = tweetSources.filter((source) => !source.featured);

export function getTweetSourcesForPhrase(slug: string) {
  return tweetSources.filter((source) => source.phraseSlugs?.includes(slug));
}
