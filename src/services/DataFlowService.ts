import { ContentShort } from "../types/contentTypes";

interface FilterFishesDto {
    fishes: ContentShort[];
    tags: Set<string>,
    search: string;
    hideNotBought?: boolean
    ownedFishes: string[];
}

export function getFilteredFishes({
  fishes,
  tags,
  search = '',
  hideNotBought = false,
  ownedFishes = []
}: FilterFishesDto) {
  let filtered: ContentShort[] = tags.size
    ? fishes.filter(fish => {
        for (const tag of tags) {
        if (!fish.tags.includes(tag)) {
            return false;
        }
        }
        return true;
    })
    : fishes;
  if (hideNotBought) {
    filtered = filtered.filter(fish => ownedFishes.includes(fish.id));
  } else if (ownedFishes.length) {
    filtered.sort((a: ContentShort, b: ContentShort): number => {
        const isAOwned = ownedFishes.includes(a.id);
        const isBOwned = ownedFishes.includes(b.id);
        if (isAOwned) {
            if (isBOwned) {
                return 0;
            }
            return -1;
        } else if (isBOwned) {
            return 1;
        }
        return 0;
    });
  }
  if (search) {
    filtered = filtered.filter((fish: ContentShort) => fish.name.includes(search));
  }
  return filtered;
}