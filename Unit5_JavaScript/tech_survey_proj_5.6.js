//Technical Survey Project - part 2 - Exercise 6

//Given code
const guests = {
    ANTONY: {
        title: "General",
        region: "Rome",
        dietaryPreference: "Vegetarian",
        pastGifts: ["Golden Laurel", "Chariot"]
    },
    CICERO: {
        title: "Orator",
        region: "Arpinum",
        dietaryPreference: "Omnivore",
        pastGifts: ["Scroll of Proverbs", "Quill"]
    }
};

//Step 1
guests.BRUTUS = {
        title: "Senator",
        region: "Rome",
        dietaryPreference: "Vegan",
        pastGifts: ["Silver Dagger", "Marble Bust"]
}

//Step 2
// guests.CICERO.pastGifts[2] = "Golden Lyre";
guests.CICERO.pastGifts.push('Golden Lyre');

//Step 3
const regionAnthony = guests.ANTONY.region;

//Step 4
delete guests.CICERO;

//Step 5
const generalProfile = guests.ANTONY;
generalProfile.region = 'Egypt';