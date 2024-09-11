//hero.data.ts
export interface Blog {
    title: string;
    _id: string;
    image: string;
    date: string;
  }
  
  export const BLOG_DATA: Blog[] = [
    {
      title: "price",
      _id: "1",
      image: "https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/1696691175374-MJY4VWB1KS8NU3DE3JK1/Sounds-of-Nature.jpg",
    
    date: "3 days ago", 
    
    },
    {
        title: "test2",
        _id: "2",
        image: "https://static-cse.canva.com/blob/846900/photo1502082553048f009c37129b9e1583341920812.jpeg",
      
      date: "3 days ago", 
      
      },{
        title: "price2",
        _id: "3",
        image: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg",
      
      date: "3 days ago", 
   
      },
   
  ];