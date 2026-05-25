export namespace main {
	
	export class Progression {
	    learned: number;
	    total: number;
	
	    static createFrom(source: any = {}) {
	        return new Progression(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.learned = source["learned"];
	        this.total = source["total"];
	    }
	}

}

export namespace types {
	
	export class Word {
	    English: string;
	    Turkish: string;
	    Picture: string;
	    Sample: string;
	
	    static createFrom(source: any = {}) {
	        return new Word(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.English = source["English"];
	        this.Turkish = source["Turkish"];
	        this.Picture = source["Picture"];
	        this.Sample = source["Sample"];
	    }
	}

}

