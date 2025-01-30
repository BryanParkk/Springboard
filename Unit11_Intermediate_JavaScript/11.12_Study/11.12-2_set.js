//sets
const bannedHashTags = new Set(["nofilter", "justsaying", "winning", "yolo"]);

bannedHashTags.add("bestlife").add("selfie");

console.log(bannedHashTags.has("selfie"));

bannedHashTags.delete("selfie");

console.log(bannedHashTags.has("selfie"));

//
function filterHashTags1(tags) {
  const bannedHashTags = new Set(["nofilter", "justsaying", "winning", "yolo"]);
  return tags.filter((tag) => !bannedHashTags.has(tag));
}
const susansTags1 = ["happymonday", "yolo", "winning", "sunset"];
//
function filterHashTags2(tags) {
  const bannedHashTags = ["nofilter", "justsaying", "winning", "yolo"];
  return tags.filter((tag) => !bannedHashTags.includes(tag));
}
const susansTags2 = ["happymonday", "yolo", "winning", "sunset"];
//

const dup = ["aa", "ab", "ac", "ad", "aa", "ab", "ac"];
const dup2 = new Set(dup);
console.log(new Set(dup));
console.log([...new Set(dup2)]);

// set, add, has, delete, clear
