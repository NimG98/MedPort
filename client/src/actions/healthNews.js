// Functions to help with health news.


/* Get top health news articles in Canada */
export const getTopHealthNews = (component) => {
    const url = "/api/news"
    

    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(newsArticlesJson => {
            if (newsArticlesJson) {
                const condensedNewsArticleArray = [];
                // const condensedNewsArticleArray = newsArticlesJson.articles.slice(0, 6);
                for(var article of newsArticlesJson.articles) {
                    if(condensedNewsArticleArray.length === 6) {
                        break;
                    }
                    if(article.urlToImage){
                        condensedNewsArticleArray.push(article);
                    }
                }
                if(component){
                    component.setState({ newsArticleArray: condensedNewsArticleArray });
                }
                return condensedNewsArticleArray;
            }
        })
        .catch(error => {
            console.log(error);
        });
}