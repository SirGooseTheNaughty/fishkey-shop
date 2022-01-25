export const TAGS = [
    "все", "скролл", "вектор", "текст",
    "кнопки", "hover", "меню", "фото",
    "видео", "фон", "drag", "курсор"
];

type fishDescNamesTypes = {
    [key: string]: string
}

export const FISH_DESC_NAMES: fishDescNamesTypes = {
    desc: "описание",
    warning: "предупреждение",
    prep: "подготовка",
    params: "настройка"
};

export class AppStateStore {
    tags: Set<string> = new Set();
    popupFishId: string = "";
    basketFishIds: Set<string> = new Set([]);
    isBasketVisible: boolean = false;
    isFishPopupVisible: boolean = false;
    isLoginVisible: boolean = false;

    public toggleTag = (tag: string): void => {
        if (tag === "все") {
            this.tags = new Set();
            return;
        }
        if (this.tags.has(tag)) {
            this.tags.delete(tag);
        } else {
            this.tags.add(tag);
        }
    }

    private setOverflow = (isHidden: boolean) => {
        if (isHidden) {
            document.querySelector('body').style.overflowY = 'hidden';
            document.querySelector('body').style.marginRight = '17px';
        } else {
            document.querySelector('body').style.overflowY = 'auto';
            document.querySelector('body').style.marginRight = '0';
        }
    }

    public setPopupFishId = (id: string): void => {
        this.popupFishId = id;
        this.setOverflow(Boolean(id));
    }

    public toggleBasketFishId = (id: string): void => {
        if (this.basketFishIds.has(id)) {
            this.basketFishIds.delete(id);
        } else {
            this.basketFishIds.add(id);
        }
    }

    public toggleIsBasketVisible = (): void => {
        this.isBasketVisible = !this.isBasketVisible;
        this.setOverflow(this.isBasketVisible);
    }

    public toggleIsLoginVisible = (): void => {
        this.isLoginVisible = !this.isLoginVisible;
        this.setOverflow(this.isLoginVisible);
    }
}