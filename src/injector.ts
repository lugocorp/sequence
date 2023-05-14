
export default class Injector {
  private objects: Record<string, any> = {};
  private classes: Record<string, any> = {
    renderer: 'media/renderer',
    assets: 'media/loader',
    chain: 'logic/chain',
    data: 'serial/manager',
    history: 'media/history',
    audio: 'media/audio',
    party: 'entities/party'
  };

  /**
   * Grab a dependency and initialize one if needed
   */
  async get(key: string, stack?: string[]): Promise<any> {
    if (!this.objects[key]) {
      if (stack?.includes(key)) {
        throw new Error(`Circular dependency [ ${stack.join(', ')}, ${key} ]`);
      }
      const that = this;
      const obj = Object.create(null);
      const builder = (await import(`./${that.classes[key] || key}.ts`)).default;
      const deps = this.getDependencies(builder);
      Object.assign(obj, builder.prototype);
      builder.call(obj, deps.map((d) => that.get(d, [...(stack || []), key])));
      this.objects[key] = obj;
    }
    return this.objects[key];
  }

  /**
   * Grab a list of parameter names from a given function
   */
  private getDependencies(cls: any): string[] {
    const desc: string = cls.toString();
    const match = desc.match(`function ${cls.name}\w*\\(`);
    if (!match) {
      return [];
    }
    const start: number = match.index + match[0].length;
    const end: number = desc.indexOf(')', start);
    if (start === end) {
      return [];
    }
    return desc.substring(start, end).split(', ');
  }
}