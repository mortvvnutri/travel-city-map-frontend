interface Category {
    id: number,
    name: string,
    parent_id: number | null | undefined
}

export class Breadcrumbs {

    trail: (number|undefined|null)[]
    map: Category[]
    current: Category | undefined | null
    top_row: Category[]
    list: Category[]

    constructor(init_data: Category[]) {
        this.map = init_data
        this.top_row = init_data.filter(e=>!e.parent_id)
        this.list = init_data.filter(e=>e.parent_id===this.top_row[0].id)
        this.trail = [undefined, this.top_row[0].id]
        return this
    }
    
    deeper(id: number){
        this.trail.push(id)
        this.top_row = this.list
        this.list = this.map.filter(e=>e.parent_id === id)
        return this
    }

    switchLast(id: number){
        this.trail[this.trail.length-1] = id
        this.list = this.map.filter(e=>e.parent_id === id)
        return this
    }

    goBack(){
        if(this.trail.length<3){
            return this
        }
        this.trail.pop()
        this.list = this.map.filter(e=>e.parent_id === this.trail[this.trail.length-1])
        this.top_row = this.map.filter(e=>e.parent_id === this.trail[this.trail.length-2])
        return this
    }

    getChildrenOf(id: number){
        return this.map.filter(e=>e.parent_id===id)
    }
}