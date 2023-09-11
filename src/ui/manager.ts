import View from './view';

export default class ViewManager {
    private selectedViewIndex = 0;
    private actionsOpen = false;
    private views: View[] = [];

    hasOptions(): boolean {
        return this.views.length > 1;
    }

    changeOption(d: 1 | -1): boolean {
        if (this.selectedViewIndex + d >= this.views.length || this.selectedViewIndex + d < 0) {
            return false;
        }
        this.selectedViewIndex += d;
        return true;
    }

    setViews(views: View[]): void {
        this.selectedViewIndex = 0;
        this.actionsOpen = false;
        this.views = views;
    }

    getView(): View {
        if (!this.actionsOpen) {
            const that = this;
            return {
                ...this.views[this.selectedViewIndex],
                actions: {
                    options: () => {
                        that.actionsOpen = true;
                    }
                }
            };
        }
        return this.views[this.selectedViewIndex];
    }
}