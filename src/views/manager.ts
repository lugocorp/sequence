import { WTEXT } from '../types';
import EventView from './event';
import View from './view';

type ViewStackEntry = {
    selectedViewIndex: number;
    views: View[];
};

export default class ViewManager {
    private actionsOpen = false;
    private viewStack: ViewStackEntry[] = [];

    private get views(): View[] {
        return this.viewStack[this.viewStack.length - 1].views;
    }

    private get selectedViewIndex(): number {
        return this.viewStack[this.viewStack.length - 1].selectedViewIndex;
    }

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
        this.viewStack[this.viewStack.length - 1].selectedViewIndex += d;
        return true;
    }

    setEvent(event: EventView): void {
        this.setViews(event.getViews());
    }

    setViews(views: View[]): void {
        this.viewStack = [];
        this.pushViews(views);
    }

    pushViews(views: View[]): void {
        this.actionsOpen = false;
        for (const view of views) {
            view.text = this.formatText(view.text);
        }
        this.viewStack.push({
            selectedViewIndex: 0,
            views
        });
    }

    popViews(): void {
        this.viewStack.slice(this.viewStack.length - 1, 1);
    }

    getView(): View {
        const current: View = this.views[this.views.length - 1][this.selectedViewIndex];
        if (Object.keys(current.actions).length === 1) {
            return current;
        }

        if (this.actionsOpen) {
            return {
                ...current,
                actions: {
                    ...current.actions,
                    back: () => {
                        this.actionsOpen = false;
                    }
                }
            };
        }

        return {
            ...current,
            actions: {
                options: () => {
                    this.actionsOpen = true;
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
            while (
                words.length &&
                this.visibleLength(line) + this.visibleLength(words[0]) + 1 <= WTEXT
            ) {
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
