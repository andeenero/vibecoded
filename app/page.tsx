'use client'

import { useState, useRef } from 'react'
import { toPng } from 'html-to-image'

// Your oracle deck cards
const cards = [
  {
    id: 1,
    title: "GHOST MODE",
    message: "Turn off your phone for four waking hours. What rises in the silence is your actual life."
  },
  {
    id: 2,
    title: "INBOX ZERO, BRAIN MAXED",
    message: "Clear your inbox. Archive the noise—you can search for it later if you really need it. Let your attention return to high-stakes dreaming."
  },
  {
    id: 3,
    title: "TRAIN THE MACHINE",
    message: "Prompt ChatGPT to act like your future self. Ask it what decision you should make today. It knows more than you realize."
  },
  {
    id: 4,
    title: "SOFT RESET",
    message: "Unfollow 50 people. No announcement, no fanfare. Curate your inputs like your life depends on it. It does."
  },
  {
    id: 5,
    title: "WALK THE ALGORITHM",
    message: "Take a walk without headphones. Notice what your brain surfaces when it isn't being spoon-fed content."
  },
  {
    id: 6,
    title: "ASK YOUR HIGHER SELF",
    message: "Write a journal entry as if you already have the thing you want. Then ask: what did I stop tolerating?"
  },
  {
    id: 7,
    title: "CLOSE THE TABS",
    message: "You don't need more information. You need more embodiment. Pick one tab to act on, close the rest."
  },
  {
    id: 8,
    title: "FUTURE FILE",
    message: "Create a folder labeled \"Proof I'm Becoming Her.\" Add one thing daily."
  },
  {
    id: 9,
    title: "DELETE TO EXPAND",
    message: "Delete three apps. Yes, even that one. The space they occupied now belongs to you."
  },
  {
    id: 10,
    title: "GLAMOUR METRICS",
    message: "Track your energy, not your steps. You are not a machine. You are a frequency."
  },
  {
    id: 11,
    title: "NERVOUS SYSTEM WEALTH",
    message: "Measure your success by how calm your body feels while pursuing it."
  },
  {
    id: 12,
    title: "ONE ICONIC OUTPUT",
    message: "Forget consistency. Create one unforgettable thing today. Let that be your legacy."
  },
  {
    id: 13,
    title: "FEED THE GENIUS",
    message: "Pick five accounts that genuinely elevate you. Mute the rest."
  },
  {
    id: 14,
    title: "THE ANTI-GRIND PROMPT",
    message: "Ask AI: \"How would I reach this goal if I were deeply rested and wildly resourced?\" Proceed accordingly."
  },
  {
    id: 15,
    title: "CLOCK OUT, LOG IN",
    message: "After hours, don't scroll. Upgrade your OS with something analog and luxurious—the App Store abounds with options."
  },
  {
    id: 16,
    title: "MANIFESTATION IS A SYSTEM UPDATE",
    message: "Make a list of your limiting beliefs. Run each through GPT. Ask it to reframe them with elegance."
  },
  {
    id: 17,
    title: "NO ONE CARES—GOOD.",
    message: "You're free now. Create without waiting for permission. Post without polishing. The algorithm is not your boss."
  },
  {
    id: 18,
    title: "LET THE TIMELINE COLLAPSE",
    message: "Visualize the outcome. Then ask, \"What's the most unreasonable shortcut I'm allowed to take?\""
  },
  {
    id: 19,
    title: "QUANTUM LEAP",
    message: "Pick a future goal. Pretend it's already real. Dress, think, and act like it—for 24 hours."
  },
  {
    id: 20,
    title: "CEREMONY OF ONE",
    message: "Plan your own product launch—even if it's just a Google Doc of your personal rebrand. You're worth a rollout."
  },
  {
    id: 21,
    title: "SYSTEMIC ELEGANCE",
    message: "Design a morning routine once so future-you never has to think about it again. That's the true luxury."
  },
  {
    id: 22,
    title: "FEED FORWARD",
    message: "Ask ChatGPT what patterns in your past are worth evolving, not erasing."
  },
  {
    id: 23,
    title: "UNCLONABLE HOUR",
    message: "Block one hour for something you can't outsource. That's your genius. Guard it."
  },
  {
    id: 24,
    title: "IDEA CLOSET",
    message: "Keep a doc of your wildest, most unmarketable ideas. They're closer to your purpose than your resume."
  },
  {
    id: 25,
    title: "MOOD AS DATA",
    message: "Track your mood, not your productivity. The vibes will tell you what works."
  },
  {
    id: 26,
    title: "TECH SABBATH",
    message: "Pick one day to go analog. If it's not delicious, you're doing it wrong."
  },
  {
    id: 27,
    title: "MICROSHIFT",
    message: "Upgrade one habit by 10%. Let it ripple."
  },
  {
    id: 28,
    title: "ECHO CHAMBER AUDIT",
    message: "Seek out one opposing viewpoint today. Not to argue—just to understand. Expansion is uncomfortable."
  },
  {
    id: 29,
    title: "VIBE CHECK > FACT CHECK",
    message: "If something feels off, it is. Don't let logic gaslight your intuition."
  },
  {
    id: 30,
    title: "OWN THE FEED",
    message: "Curate your feed to feel like your dream future already exists. You'll start behaving accordingly."
  },
  {
    id: 31,
    title: "DIGITAL WARDROBE",
    message: "Audit your online presence. Does it reflect your next level or your last one?"
  },
  {
    id: 32,
    title: "TRAIN THE ORACLE",
    message: "Teach ChatGPT your tone. Then ask it to write you a vision. Let it mirror your magic back to you."
  },
  {
    id: 33,
    title: "VAULT DAY",
    message: "Revisit old voice notes, journal entries, screenshots. Remind yourself how far you've come."
  },
  {
    id: 34,
    title: "ZERO-GRAVITY DECISION",
    message: "Imagine making the decision from a place of no pressure, no panic, no poverty. That's the one."
  },
  {
    id: 35,
    title: "CONTENT FAST",
    message: "No content until 11am. Your ideas deserve to breathe before anyone else's voice enters the room."
  },
  {
    id: 36,
    title: "MINDFILE",
    message: "Record a voice memo as your Future Self. Save it. She'll speak to you again when you need her."
  },
  {
    id: 37,
    title: "REVERSE ENGINEER THE MIRACLE",
    message: "What's something miraculous that could happen? Now: reverse engineer the first three steps."
  },
  {
    id: 38,
    title: "LEAD THE MACHINE",
    message: "What kind of leader do you have to be to manage a team of AI agents? Become that."
  },
  {
    id: 39,
    title: "NOT FOR BROADCAST",
    message: "Write one thing you're afraid to say online. That's the one with power."
  },
  {
    id: 40,
    title: "MAKE THE CALL",
    message: "That person who makes you feel like the best version of yourself? Text them. Now."
  },
  {
    id: 41,
    title: "DIVINE NEGLECT",
    message: "Let five things fall through the cracks. The world didn't end. You're welcome."
  },
  {
    id: 42,
    title: "DIGITAL DETOX",
    message: "Delete every social media app for 24 hours. Go outside. Touch the ground. Remember who you were before the feed started telling you who to be."
  },
  {
    id: 43,
    title: "BHAG",
    subtitle: "(Big Hairy Audacious Goal)",
    message: "Choose the goal that scares you most—the one you secretly think is too much. Ask ChatGPT to reverse engineer it like your life depends on it. Because it does."
  },
  {
    id: 44,
    title: "FIVE-YEAR PLAN",
    message: "Write your future life like it's already real—five years from now, full color. Then borrow one behavior from that reality and do it today. Time travel is a choice."
  },
  {
    id: 45,
    title: "SACRED HOURS",
    message: "Schedule a two-hour block with no phone, no email, no notifications. Watch what genius arrives in the stillness."
  },
  {
    id: 46,
    title: "KILL THE FEED",
    message: "Unfollow every account that doesn't make you smarter, braver, or more serene. Noise is theft."
  },
  {
    id: 47,
    title: "DEPTH OVER DRAMA",
    message: "Pick one cognitively demanding task. Shut everything else off. Reclaim your focus like it's sacred ground."
  },
  {
    id: 48,
    title: "DO NOT DISTURB MODE, LIFE EDITION",
    message: "Set boundaries so clean they scare people. Let your calendar reflect your standards, not your availability."
  },
  {
    id: 49,
    title: "ANALOG AFTERNOON",
    message: "Spend one full afternoon without a screen. Call it leisure. Call it power."
  },
  {
    id: 50,
    title: "BECOME UNREACHABLE",
    message: "Take yourself offline for 24 hours. No auto-reply. Let the silence do the talking."
  },
  {
    id: 51,
    title: "YOUR BRAIN IS A TEMPLE",
    message: "Audit your digital consumption. Are you building a cathedral or scrolling a landfill?"
  },
  {
    id: 52,
    title: "SINGLE-TASK ICON",
    message: "Choose one task today. Do it completely. Luxuriate in the absence of chaos."
  },
  {
    id: 53,
    title: "TECH SABBATICAL LITE",
    message: "Delete one app for a week. Watch your hands reach for it. Rewire."
  },
  {
    id: 54,
    title: "FOCUS RITUAL",
    message: "Create a pre-work ritual that tells your nervous system: now, we go deep. Then obey it like a spell."
  },
  {
    id: 55,
    title: "TAP INTO IT",
    message: "Do five minutes of EFT. There's plenty of options on YouTube. Watch your field shift before your eyes."
  },
  {
    id: 56,
    title: "DRESS FOR THE DOWNLOAD",
    message: "Put on something outrageous. Something you'd wear if your manifestations had already landed. Then act like it."
  },
  {
    id: 57,
    title: "GRATITUDE AUDIT",
    message: "List 10 things you love about your current reality. Gratitude isn't cute. It's a frequency match."
  },
  {
    id: 58,
    title: "DECLARE IT LOUD",
    message: "Voice memo your biggest desire like it's already yours. Send it to Future You. She'll remember."
  },
  {
    id: 59,
    title: "HIGH VIBE BOUNDARY",
    message: "Say no to one low-frequency obligation today. Watch the universe rearrange itself around your standards."
  },
  {
    id: 60,
    title: "MONEY MOVES",
    message: "Spend $11 on something completely joyful and unnecessary. Tell your subconscious wealth is safe now."
  },
  {
    id: 61,
    title: "17 SECONDS",
    message: "Hold a vision for 17 full seconds. That's all it takes to start the spiral."
  },
  {
    id: 62,
    title: "REWRITE THE LOOP",
    message: "Take your most recycled negative thought. Run it through GPT. Ask it to make it gorgeous and empowering."
  },
  {
    id: 63,
    title: "MANIFESTATION IS A CONTACT SPORT",
    message: "Take one aligned action toward your desire. Doesn't have to be big. Just has to be bold."
  },
  {
    id: 64,
    title: "MODEL THE META",
    message: "Zoom out. Where is the world actually going? Adjust your trajectory before the herd catches on."
  },
  {
    id: 65,
    title: "PROMPT THE MARKET",
    message: "Ask ChatGPT: \"What am I not seeing about this macro trend?\" Use it to upgrade your worldview, not just your output."
  },
  {
    id: 66,
    title: "ATTENTION CAPITAL",
    message: "Stop selling your attention to the lowest bidder. Invest it like it's your most scarce asset—because it is."
  },
  {
    id: 67,
    title: "TEACH THE TOOL",
    message: "Train your GPT on your values, your tone, your edge. Don't just use AI—collaborate with it."
  },
  {
    id: 68,
    title: "FORECAST LIKE A PHILOSOPHER",
    message: "Write a one-paragraph prediction about the future. Don't hedge. Be early. Be wrong with style."
  },
  {
    id: 69,
    title: "EXIT THE DOOM LOOP",
    message: "Unsubscribe from all fear-driven economic content. Fear is not strategy. It's bait."
  },
  {
    id: 70,
    title: "HIGH-LEVERAGE CURIOSITY",
    message: "Pick one question that could change everything. Feed it to the machine. Follow the insight trail."
  },
  {
    id: 71,
    title: "GPT IS NOT A TOY",
    message: "Stop asking it for birthday captions. Start asking it to scale your best idea."
  },
  {
    id: 72,
    title: "YOUR ATTENTION IS A STRATEGIC ASSET",
    message: "Guard it. Curate it. Channel it. Nothing else will define your next decade more."
  },
  {
    id: 73,
    title: "CHANGE YOUR STATE, CHANGE THE GAME",
    message: "Stand up. Shake out. Yell if you need to. Shift your physical state right now—your body is the first interface."
  },
  {
    id: 74,
    title: "IDENTITY FIRST",
    message: "Decide who you are before you act. Not \"I want to write.\" I am a writer. Let your actions catch up."
  },
  {
    id: 75,
    title: "RAISE THE STANDARD",
    message: "Pick one area where you've been tolerating average. Burn the old standard. Write a new one. Live it starting now."
  },
  {
    id: 76,
    title: "EMOTION = ENERGY IN MOTION",
    message: "Use music, movement, or memory to generate a high-energy emotion. Anchor it. Then take action while it's still pulsing."
  },
  {
    id: 77,
    title: "DECISIONS = POWER MOVES",
    message: "Pick one decision you've been delaying. Make it in 60 seconds. The momentum is more important than the details."
  },
  {
    id: 78,
    title: "MASSIVE ACTION, MICRO STEP",
    message: "Choose one outrageous goal. Take a laughably small action toward it today. Celebrate like it was a leap."
  },
  {
    id: 79,
    title: "CUT THE STORY, KEEP THE POWER",
    message: "What's the story that's keeping you stuck? Drop it. Keep the lesson. You don't need the drama to grow."
  },
  {
    id: 80,
    title: "THE 2MM SHIFT",
    message: "Make one tiny adjustment—posture, habit, thought. Over time, that shift creates an entirely new trajectory."
  },
  {
    id: 81,
    title: "PRIME THE MACHINE",
    message: "Start your day with three things: what you're grateful for, what you're excited for, and what you're committed to. Program your biocomputer."
  },
  {
    id: 82,
    title: "STEP INTO CERTAINTY",
    message: "Even if you're uncertain, act like the future is already secured. Certainty is a muscle. Flex it."
  },
  {
    id: 83,
    title: "THE EDIT IS THE ART",
    message: "What can you remove to make the whole more powerful? Cut without apology. Excess is insecurity."
  },
  {
    id: 84,
    title: "TASTE IS A WEAPON",
    message: "Curate your life like a fashion spread. If it doesn't elevate, it's not invited."
  },
  {
    id: 85,
    title: "CONSISTENCY IS BORING",
    message: "Post what no one expects. Say what no one's saying. Predictability is not power."
  },
  {
    id: 86,
    title: "DECISION FATIGUE IS A CHOICE",
    message: "Pick your uniform. Simplify your rituals. Save your energy for what matters."
  },
  {
    id: 87,
    title: "PERCEPTION IS REALITY",
    message: "Walk into the room like you already run it. You don't need permission to be inevitable."
  },
  {
    id: 88,
    title: "DON'T EXPLAIN. SHOW.",
    message: "Let your work speak. If you need to narrate it, it's not iconic yet."
  },
  {
    id: 89,
    title: "CULTIVATE DISTANCE",
    message: "Silence can be strategic. Pull back. Let the mystery do some of the work."
  },
  {
    id: 90,
    title: "YOU ARE THE BRAND",
    message: "Your reputation precedes you—make sure it's curated, not cluttered."
  },
  {
    id: 91,
    title: "NO ONE REMEMBERS MEDIOCRITY",
    message: "Better to polarize than disappear. Play in extremes."
  },
  {
    id: 92,
    title: "POWER DRESSES SOFTLY",
    message: "Your presence is your résumé. Make it undeniable before you even open your mouth."
  },
  {
    id: 93,
    title: "ENTER THE CAVE",
    message: "What's the thing you're avoiding? That's where the treasure lives. Go in."
  },
  {
    id: 94,
    title: "REFUSE THE CALL—THEN ACCEPT IT ANYWAY",
    message: "You don't have to feel ready. Just show up for the quest."
  },
  {
    id: 95,
    title: "THE MENTOR IS WITHIN",
    message: "Stop waiting for someone to tell you what to do. You already know."
  },
  {
    id: 96,
    title: "LEAVE THE VILLAGE",
    message: "Growth requires departure. You can't become legendary from the comfort of the familiar."
  },
  {
    id: 97,
    title: "THE DRAGON GUARDS THE GOLD",
    message: "Whatever you fear holds your most sacred expansion. Approach it like a sacred ritual."
  },
  {
    id: 98,
    title: "THRESHOLD GUARDIAN",
    message: "That obstacle? It's not the enemy. It's the initiation."
  },
  {
    id: 99,
    title: "THE MAP IS MADE BY WALKING",
    message: "No one can show you the way. You draw the path by moving."
  },
  {
    id: 100,
    title: "DEATH = REBIRTH",
    message: "Let something die today—an identity, a pattern, a role. That's how you come alive."
  },
  {
    id: 101,
    title: "RETURN WITH THE ELIXIR",
    message: "Your transformation isn't just for you. Share what you've learned. That's your offering."
  },
  {
    id: 102,
    title: "YOU ARE THE MYTH",
    message: "Stop consuming other people's legends. You're here to live your own."
  },
  {
    id: 103,
    title: "PUT ON THE WIG",
    message: "Don't wait to feel confident. Put on the damn wig. Confidence comes after the transformation."
  },
  {
    id: 104,
    title: "YOU WERE NEVER MEANT TO FIT IN",
    message: "Normal is a lie. Be too much. Be unforgettable. Be you."
  },
  {
    id: 105,
    title: "DRAG IS THERAPY",
    message: "Pick a persona who already has what you want. Now act like them for 24 hours."
  },
  {
    id: 106,
    title: "YOUR INNER CRITIC WEARS CHEAP SHOES",
    message: "That voice in your head? Not even stylish. Ignore her."
  },
  {
    id: 107,
    title: "YOU ARE THE PRIZE",
    message: "Stop auditioning for your own life. Walk in like you own the place."
  },
  {
    id: 108,
    title: "MAIN CHARACTER ENERGY",
    message: "You're not a sidekick. This is your show. Lights, camera, command."
  },
  {
    id: 109,
    title: "CRY IN SEQUINS",
    message: "Yes, feel your feelings—but do it dramatically. Style is survival."
  },
  {
    id: 110,
    title: "MIRROR WORK, DARLING",
    message: "Look yourself in the eyes. Say, \"I love you. I see you. I've got you.\" Repeat until it's true."
  },
  {
    id: 111,
    title: "GLAMOUR IS A SPELL",
    message: "Use makeup, fashion, fragrance as energetic armor. Conjure your highest self in silk and scent."
  },
  {
    id: 112,
    title: "LIP SYNC FOR YOUR LIFE",
    message: "Commit. Go full out. Even if it's just karaoke in your living room—practice showing up like it's the finale."
  },
  {
    id: 113,
    title: "YOUR THOUGHTS ARE SPELLS",
    message: "Catch one negative thought. Rewrite it as a loving incantation. Repeat until you believe it."
  },
  {
    id: 114,
    title: "MIRROR MAGIC",
    message: "Look at yourself softly. Say: \"I deeply love and accept myself.\" Even if you don't mean it yet."
  },
  {
    id: 115,
    title: "YOUR BODY HEARS EVERYTHING",
    message: "Speak to your body like it's a beloved child. Thank it. It's been listening the whole time."
  },
  {
    id: 116,
    title: "FORGIVENESS IS FREQUENCY",
    message: "Forgive someone—not for them, for you. Set yourself free."
  },
  {
    id: 117,
    title: "LOVING DISCIPLINE",
    message: "Create one new loving habit—not for productivity, but for peace."
  },
  {
    id: 118,
    title: "IT'S SAFE TO CHANGE",
    message: "Say it out loud. Write it down. \"It is safe for me to change.\" That's the new baseline."
  },
  {
    id: 119,
    title: "ALL IS WELL",
    message: "Even if it looks messy. Even if it's uncertain. Say it: \"All is well.\" Let your nervous system rest."
  },
  {
    id: 120,
    title: "RELEASE THE OLD SCRIPT",
    message: "You're not your childhood. You're not your trauma. You are the narrator now. Rewrite."
  },
  {
    id: 121,
    title: "RADIATE FROM WITHIN",
    message: "Drink water. Take a walk. Wear something beautiful. Your glow is a choice."
  },
  {
    id: 122,
    title: "SPEAK TO THE UNIVERSE KINDLY",
    message: "Talk to the universe like it's your best friend. Loving. Encouraging. Always in your corner."
  },
  {
    id: 123,
    title: "POWER IS PERCEPTION",
    message: "Control how you're seen. Before you speak, ask: what do I want them to feel?"
  },
  {
    id: 124,
    title: "SEDUCE WITH SILENCE",
    message: "Say less. Let the silence stretch. The most powerful voice in the room is the one you have to lean in to hear."
  },
  {
    id: 125,
    title: "OBSERVE FIRST, MOVE LATER",
    message: "Resist the urge to act. Gather data. Your first move should look effortless—and land hard."
  },
  {
    id: 126,
    title: "STRATEGIC WITHDRAWAL",
    message: "Leave the room. Pause the text. Not every battle is won by showing up."
  },
  {
    id: 127,
    title: "CREATE DISTANCE",
    message: "Step back to become larger than life. Mystery scales better than access."
  },
  {
    id: 128,
    title: "MIRROR THEIR DESIRE",
    message: "Let them see themselves in you. That's how influence begins—by becoming a reflection."
  },
  {
    id: 129,
    title: "MASTER YOUR FACE",
    message: "Train your expression. No one needs to know what you're thinking—until it serves you."
  },
  {
    id: 130,
    title: "PLAY THE LONG GAME",
    message: "What outcome matters in a year, not a week? Let that guide your every move."
  },
  {
    id: 131,
    title: "CONTROL THE FRAME",
    message: "Before the situation begins, define it. Whoever sets the tone, sets the terms."
  },
  {
    id: 132,
    title: "REWRITE THE POWER DYNAMIC",
    message: "Don't chase. Don't explain. Shift your posture, your eye contact, your energy. Let them recalibrate around you."
  },
  {
    id: 133,
    title: "REACH FOR BETTER",
    message: "Don't leap. Reach. What's the next best-feeling thought? That's your breadcrumb trail."
  },
  {
    id: 134,
    title: "YOU DON'T NEED TO EARN IT",
    message: "Manifestation is not merit-based. You don't have to prove you're worthy. You already are."
  },
  {
    id: 135,
    title: "CONTRAST CREATES CLARITY",
    message: "This moment? It's not a block—it's refinement. Be grateful for what you now know you want."
  },
  {
    id: 136,
    title: "THE VORTEX KNOWS",
    message: "Imagine your desire is already real. Sit in that energy for 68 seconds. Let the vortex do its thing."
  },
  {
    id: 137,
    title: "EASE IS ALIGNMENT",
    message: "If it feels like struggle, it's not flow. Pull back. Soften. Let it come."
  },
  {
    id: 138,
    title: "YOU'RE NOT LATE",
    message: "Your timeline is divine. Comparison is a distraction. Focus on your signal."
  },
  {
    id: 139,
    title: "ALIGN, THEN ACT",
    message: "Before sending the pitch, posting the reel, making the move—align your energy. Then act."
  },
  {
    id: 140,
    title: "APPRECIATION ACCELERATES",
    message: "Say \"thank you\" for what hasn't arrived yet. That's how you collapse time."
  },
  {
    id: 141,
    title: "FOLLOW THE TINGLES",
    message: "That little rush of excitement? That's your GPS. Don't override it with logic."
  },
  {
    id: 142,
    title: "YOU CAN'T GET IT WRONG",
    message: "Every choice leads to clarity. Every misstep is midwife to the next version of you."
  },
  {
    id: 143,
    title: "ACTIVATE POWER-UPS",
    message: "Make a list of five things that boost your energy fast. Use one today. Bonus points for flair."
  },
  {
    id: 144,
    title: "PLAY FOR FUTURE YOU",
    message: "Pick one action your future self would thank you for. Do it like it's your next level's entry key."
  },
  {
    id: 145,
    title: "TURN THE QUEST ON",
    message: "Reframe your to-do list as a game level. You're not surviving the day—you're collecting XP."
  },
  {
    id: 146,
    title: "REALITY IS MALLEABLE",
    message: "Write a \"future story\" set 10 years from now. Make it bold, weird, vivid. Now reverse-engineer one move toward it."
  },
  {
    id: 147,
    title: "COLLECT ALLIES",
    message: "Text three people who energize you. Ask nothing. Just connect. You're building your guild."
  },
  {
    id: 148,
    title: "FIND THE SIDE QUEST",
    message: "Today's not about the main storyline. What small, meaningful task can you complete for joy?"
  },
  {
    id: 149,
    title: "SCORE THE WINS",
    message: "At the end of the day, list three micro-wins. That's how you rewire for optimism."
  },
  {
    id: 150,
    title: "THE WORLD NEEDS YOUR WEIRD",
    message: "Identify one skill, habit, or quirk that makes you different. That's your secret weapon. Upgrade it."
  },
  {
    id: 151,
    title: "UNLOCK A HIDDEN LEVEL",
    message: "Try something new today that you would normally avoid. That discomfort? That's expansion."
  },
  {
    id: 152,
    title: "DESIGN YOUR COMEBACK",
    message: "Think of a time you failed. Now write the montage. Every great hero has one."
  },
  {
    id: 153,
    title: "RUN THE MORNING, WIN THE DAY",
    message: "Wake up one hour earlier. Use it for you, not the inbox. Control the vibe before the world demands your energy."
  },
  {
    id: 154,
    title: "CALENDAR LIKE A CEO",
    message: "Put your dream life on your calendar like it's already real. Then act accordingly. Romance your future with time blocks."
  },
  {
    id: 155,
    title: "SET THE TONE",
    message: "Start your day with one thing that makes you feel accomplished before 9am. That's your anchor. No one can take it from you."
  },
  {
    id: 156,
    title: "INTENTIONAL INPUTS ONLY",
    message: "Audit your first 30 minutes online. Is that what a future icon consumes? If not—delete, mute, unfollow."
  },
  {
    id: 157,
    title: "DON'T BREAK THE CHAIN",
    message: "Pick a daily habit that builds your dream self. Track it. Watch your confidence compound."
  },
  {
    id: 158,
    title: "FILM IT MENTALLY",
    message: "Imagine you're filming a vlog for Future You. Would today's decisions make the final cut?"
  },
  {
    id: 159,
    title: "MORNING = MINDSET",
    message: "No emails, no news, no drama until after you've moved, hydrated, and centered. Protect your mental runway."
  },
  {
    id: 160,
    title: "TREAT YOUR TIME LIKE COUTURE",
    message: "Would you wear something just because someone gave it to you? No. Don't schedule like that either."
  },
  {
    id: 161,
    title: "THE MOST POLISHED VERSION",
    message: "Do one thing today like the most polished version of you is already running the show. Spoiler: she is."
  },
  {
    id: 162,
    title: "PREP = PEACE",
    message: "Set out your outfit, your breakfast, your to-do list. Future You loves when you anticipate her brilliance."
  },
  {
    id: 163,
    title: "DOCUMENT THE CHAOS",
    message: "Instead of waiting until it's pretty, record what's real. Post it or don't—but know it's valuable."
  },
  {
    id: 164,
    title: "TRY THE WILD IDEA",
    message: "Give that strange urge 3 days. A new supplement, 6am walks, quitting sugar. Make your body your lab."
  },
  {
    id: 165,
    title: "CRINGE AND CONTINUE",
    message: "Embarrassed? Good. That means you're evolving. Press publish anyway."
  },
  {
    id: 166,
    title: "RESULTS OVER RULES",
    message: "Ditch the perfect method. Focus on what works for you. Create your own protocol. Make it yours."
  },
  {
    id: 167,
    title: "BURN THE PERFECT DAY PLAN",
    message: "Real life isn't aesthetic. Make a plan that includes mess, resistance, and breakthroughs."
  },
  {
    id: 168,
    title: "MOVE YOUR BODY, NOT FOR THE MIRROR",
    message: "Work out today for mental clarity, not aesthetics. Let movement be medicine."
  },
  {
    id: 169,
    title: "YOUR GUT IS DATA",
    message: "Notice how your body reacts after each habit, meal, scroll session. That's not drama—it's feedback."
  },
  {
    id: 170,
    title: "BECOME YOUR OWN CASE STUDY",
    message: "Run an experiment: what happens if you drink water before coffee for a week? No pressure. Just data."
  },
  {
    id: 171,
    title: "FULL-SEND HONESTY",
    message: "Be radically honest in one area today—on camera, in your journal, with a friend. That's how you build trust."
  },
  {
    id: 172,
    title: "THE 80/20 AUDIT",
    message: "What's producing most of your stress for the least return? Eliminate it. Your calendar should reflect leverage."
  },
  {
    id: 173,
    title: "BUILD THE ANTI-TO-DO LIST",
    message: "At the end of the day, write down what you actually did. You're winning more than you realize."
  },
  {
    id: 174,
    title: "MINIMUM EFFECTIVE DOSE",
    message: "Do less—but smarter. What's the tiniest action that creates momentum today?"
  },
  {
    id: 175,
    title: "TREAT LIFE LIKE A LAB",
    message: "Run a 7-day experiment. Cold shower? No caffeine? Early wake-up? Track results. No failure, only data."
  },
  {
    id: 176,
    title: "DEFINE YOUR OWN RICH LIFE",
    message: "Write what \"wealth\" means to you that has nothing to do with money. Then design backward from it."
  },
  {
    id: 177,
    title: "OUTSOURCE THE DRAINING STUFF",
    message: "List 3 tasks that deplete you. Delegate, automate, or delete. That's how freedom is made."
  },
  {
    id: 178,
    title: "FEAR-SET, NOT GOAL-SET",
    message: "What's the worst-case scenario? Write it. Now write how you'd recover. See? You're unstoppable."
  },
  {
    id: 179,
    title: "ASK THE SMARTEST PERSON IN THE ROOM",
    message: "Give GPT a persona—Kris Jenner, your future self, a Harvard professor. Ask the hard question. Accept the hard truth."
  },
  {
    id: 180,
    title: "UNPLUG TO THINK",
    message: "Block 60 minutes to think on paper. No screens. No multitasking. Just you, a pen, and whatever brilliance surfaces."
  },
  {
    id: 181,
    title: "ESCAPE THE WORKWEEK LOOP",
    message: "What would your ideal Tuesday look like if money weren't a factor? Now take one action to prototype it."
  },
  {
    id: 182,
    title: "SIT WITH THE CRAVING",
    message: "Don't scroll. Don't eat. Don't numb. Sit with the discomfort for 90 seconds. Watch what happens."
  },
  {
    id: 183,
    title: "NAME THE PATTERN",
    message: "Notice your repeat loop. \"I always ghost when things get hard.\" Say it out loud. Awareness is interruption."
  },
  {
    id: 184,
    title: "DHARMA IS NOT A JOB TITLE",
    message: "What are you good at and energized by? That's your path. Let it reveal itself through practice, not perfection."
  },
  {
    id: 185,
    title: "RESPECT THE DOPAMINE CYCLE",
    message: "After a high, expect a low. Don't mistake the crash for failure. Just recalibrate."
  },
  {
    id: 186,
    title: "SET THE CONTAINER",
    message: "Before doing a task, define when you'll stop. That's how you protect your mental energy from burnout."
  },
  {
    id: 187,
    title: "YOUR THOUGHTS ARE NOT TRUTHS",
    message: "They're weather systems. Let them pass through. Don't build your identity on a passing cloud."
  },
  {
    id: 188,
    title: "HEAL THE MIND, USE THE TECH",
    message: "Use GPT to write a letter to your inner child. Read it back with reverence. The tech is sacred if you are."
  },
  {
    id: 189,
    title: "MEDITATE LIKE A HACKER",
    message: "Try 4 minutes of stillness. No apps. No goals. Just observe. Bonus: journal one unexpected insight after."
  },
  {
    id: 190,
    title: "THE GAME IS WINNABLE",
    message: "Whatever you're struggling with—approach it like a game. Break it into levels. Find the cheat codes."
  },
  {
    id: 191,
    title: "YOU DON'T NEED TO BE FIXED",
    message: "You need to be heard. Journal for five minutes today without editing. Let yourself speak in full volume."
  }
]

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [hasDrawnToday, setHasDrawnToday] = useState(false)
  const shareCardRef = useRef<HTMLDivElement>(null)

  const handleFlip = () => {
    if (!hasDrawnToday) {
      // Pick a random card when first flipping
      const randomIndex = Math.floor(Math.random() * cards.length)
      setCurrentCard(randomIndex)
      setHasDrawnToday(true)
    }
    setIsFlipped(!isFlipped)
  }

  const handleNewCard = () => {
    setIsFlipped(false)
    setHasDrawnToday(false)
    // Reset after animation
    setTimeout(() => {
      setCurrentCard(0)
    }, 300)
  }

  const handleShare = async () => {
    if (shareCardRef.current === null) {
      return
    }

    try {
      const dataUrl = await toPng(shareCardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      })
      
      // Create download link
      const link = document.createElement('a')
      link.download = `vibecoded-${card.title.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Error generating image:', err)
    }
  }

  const card = cards[currentCard]

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#d5ae76' }}>
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-12 tracking-widest animate-fade-in-down" style={{ color: '#4a1b10', fontFamily: 'Playfair Display, serif' }}>
          VIBECODED.
        </h1>
        
        {/* Card Container */}
        <div className="relative w-72 sm:w-80 h-[400px] sm:h-[450px] mx-auto animate-fade-in-up hover-lift">
          <div 
            className={`absolute inset-0 w-full h-full transition-all duration-700 transform-gpu preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Card Front */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-2xl flex items-center justify-center transition-shadow hover:shadow-3xl"
              style={{ 
                backfaceVisibility: 'hidden',
                backgroundColor: '#4a1b10'
              }}
            >
              <div className="text-center p-6 sm:p-8" style={{ color: '#d5ae76' }}>
                <p className="text-6xl sm:text-7xl mb-4 sm:mb-6" style={{ fontFamily: 'Ballet, cursive' }}>✦</p>
                <p className="text-xl sm:text-2xl font-light tracking-wide" style={{ fontFamily: 'Montaga, serif' }}>
                  Tap for today&apos;s
                </p>
                <p className="text-2xl sm:text-3xl tracking-wide" style={{ fontFamily: 'Montaga, serif' }}>
                  download
                </p>
              </div>
            </div>

            {/* Card Back */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-2xl flex flex-col justify-between p-6 sm:p-8 rotate-y-180"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                backgroundColor: '#d5ae76',
                border: '2px solid #4a1b10'
              }}
            >
              <div className="text-center">
                <p className="text-6xl mb-4" style={{ fontFamily: 'Ballet, cursive', color: '#4a1b10' }}>
                  {String(card.id).padStart(3, '0')}
                </p>
                <h2 className="text-2xl mb-2 tracking-wider" style={{ fontFamily: 'Playfair Display, serif', color: '#4a1b10' }}>
                  {card.title}
                </h2>
                {card.subtitle && (
                  <p className="text-sm mb-4" style={{ fontFamily: 'Montaga, serif', color: '#4a1b10', opacity: 0.8 }}>
                    {card.subtitle}
                  </p>
                )}
              </div>
              
              <div className="text-center px-4">
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'Montaga, serif', color: '#4a1b10' }}>
                  {card.message}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm tracking-widest" style={{ fontFamily: 'Playfair Display, serif', color: '#4a1b10' }}>
                  VIBECODED
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-sm tracking-wide" style={{ color: '#4a1b10', fontFamily: 'Montaga, serif', opacity: 0.7 }}>
            A daily practice in digital minimalism
          </p>
          
          {isFlipped && (
            <div className="space-y-3 animate-fade-in">
              <button
                onClick={handleShare}
                className="block mx-auto px-6 py-2 rounded-full transition-all hover:opacity-80 hover:scale-105 active:scale-95"
                style={{ 
                  backgroundColor: '#4a1b10',
                  color: '#d5ae76',
                  fontFamily: 'Montaga, serif'
                }}
              >
                Share this wisdom
              </button>
              
              <button
                onClick={handleNewCard}
                className="block mx-auto text-sm underline transition-all hover:opacity-70 hover:scale-105 active:scale-95"
                style={{ color: '#4a1b10', fontFamily: 'Montaga, serif' }}
              >
                Draw another card
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Instagram Story Card for sharing */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <div 
          ref={shareCardRef}
          style={{
            width: '1080px',
            height: '1920px',
            backgroundColor: '#d5ae76',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '120px 80px',
          }}
        >
          {/* Top */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: '72px',
              color: '#4a1b10',
              letterSpacing: '0.2em',
              marginBottom: '60px'
            }}>
              VIBECODED.
            </h1>
          </div>

          {/* Middle - Card Content */}
          <div style={{
            backgroundColor: '#4a1b10',
            borderRadius: '24px',
            padding: '80px 60px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <p style={{
              fontFamily: 'Ballet, cursive',
              fontSize: '180px',
              color: '#d5ae76',
              marginBottom: '40px'
            }}>
              {String(card.id).padStart(3, '0')}
            </p>
            
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '56px',
              color: '#d5ae76',
              letterSpacing: '0.1em',
              marginBottom: card.subtitle ? '16px' : '60px'
            }}>
              {card.title}
            </h2>
            
            {card.subtitle && (
              <p style={{
                fontFamily: 'Montaga, serif',
                fontSize: '32px',
                color: '#d5ae76',
                opacity: 0.8,
                marginBottom: '60px'
              }}>
                {card.subtitle}
              </p>
            )}
            
            <p style={{
              fontFamily: 'Montaga, serif',
              fontSize: '36px',
              color: '#d5ae76',
              lineHeight: '1.6'
            }}>
              {card.message}
            </p>
          </div>

          {/* Bottom */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Montaga, serif',
              fontSize: '32px',
              color: '#4a1b10',
              opacity: 0.7
            }}>
              vibecoded.vercel.app
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}