class APIfeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
       let keyword =  this.queryStr.keyword? {
            
             productName :{
                $regex : this.queryStr.keyword,
                $options : "i"
            }
        }:{};

         this.query.find({...keyword})
         return this; 
    }
    filter(){
    const queryStrCopy = {...this.queryStr}
    const removeFields = ["keyword","page"]
    removeFields.forEach(field => delete queryStrCopy[field])

    let queryStr = JSON.stringify( queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match=>`$${match}`)

    
    this.query.find(JSON.parse(queryStr))
    return this;
    
    }
    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page)|| 1;
        const skip = resPerPage*(currentPage-1)
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
    // sort() {
    //     if (this.queryStr.sort) {
    //         const sortBy = this.queryStr.sort.split(',').join(' ');
    //         this.query = this.query.sort(sortBy);
    //     } else {
    //         this.query = this.query.sort('price'); 
    //     }
    //     return this;
    // }
}


module.exports = APIfeatures