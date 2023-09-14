import { WTEXT } from '../types';
import EventView from './event';
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
        for (const view of views) {
            view.text = this.formatText(view.text);
        }
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

    // Calculates string length without color annotations
    visibleLength(word: string): number {
        return word.replace(/#[0-9]/g, '').length;
    }

    // Formats text wrap according to the screen constraints
    formatText(msg: string): string {
        const words: string[] = msg.replace(/\n/g, '\n ').split(' ');
        let line: string = words.shift();
        let text = '';
        while (line.length) {
            while (words.length && this.visibleLength(line) + this.visibleLength(words[0]) + 1 <= WTEXT) {
            if (line[line.length - 1] === '\n') {
                break;
            }
            line = `${line} ${words.shift()}`;
            }
            if (line[line.length - 1] !== '\n') {
            line += '\n';
            }
            text += line;
            line = words.length ? words.shift() : '';
        }
        return text.replace(/\t/g, ' ');
    }
}
