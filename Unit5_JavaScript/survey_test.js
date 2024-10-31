//Given code
const guests = {
    ANTONY: {
        title: 'General',
        region: 'Rome',
        dietaryPreperence: 'Vegitarian',
        pastGifts: ['Golden Laurel', 'Chariot']
    },
    CICERO: {
        title: 'Orator',
        region: 'Arpinum',
        dietaryPreperence: 'Omnivore',
        pastGifts: ['Scroll of Proverbs', 'Quill']
    }
};

// Step 1
guests.BRUTUS = {
    title: 'Senator',
    region: 'Rome',
    dietaryPreperence: 'Vegan',
    pastGifts: ['Silver Dagger']
};

// Step 2
guests.CICERO.pastGifts.push('Golden Lyre');

// Step 3
const regionAntony = guests.ANTONY.region;

// Step 4
delete guests.CICERO;

// Step 5
const generalProfile = guests.ANTONY;
generalProfile.region = 'Egypt';

// console.log(guests);
console.log(regionAntony);