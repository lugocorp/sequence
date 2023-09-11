import EventView from '../views/event';
import View from './view';

export default class ViewManager {
    private selectedViewIndex = 0;
    private actionsOpen = false;
    private views: View[] = [];

    hasOptions(): boolean {
        return this.views.length > 1;
    }

    drawArrowLeft(): boolean {
        return this.selectedViewIndex > 0;
    }

    drawArrowRight(): boolean {
        return this.selectedViewIndex < this.views.length - 1;
    }

    changeOption(d: 1 | -1): boolean {
        if (this.selectedViewIndex + d >= this.views.length || this.selectedViewIndex + d < 0) {
            return false;
        }
        this.selectedViewIndex += d;
        return true;
    }

    setEvent(event: EventView): void {
        this.setViews(event.getViews());
    }

    setViews(views: View[]): void {
        this.selectedViewIndex = 0;
        this.actionsOpen = false;
        this.views = views;
    }

    getView(): View {
        const current: View = this.views[this.selectedViewIndex];
        if (this.actionsOpen || Object.keys(current.actions).length === 1) {
            return current;
        }

        const that = this;
        return {
            ...current,
            actions: {
                options: () => {
                    that.actionsOpen = true;
                }
            }
        };
    }
}
