import React from "react";
import { withRouter } from "react-router";

import "./styles.css";
import 'antd/dist/antd.css';
import { Card, Row }  from "antd";
import backgroundPic from "./static/dashboard-picture.png"

import Header from './../Header';
import NavBar from './../NavBar';
import { getUserProfileInfo } from "../../actions/user";
import { getTopHealthNews } from "../../actions/healthNews";

const { Meta } = Card;

/* Component for the Dashboard */
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.props.history.push("/dashboard");
        this.state = {
            name: null
        }
        this.getNewsArticles = this.getNewsArticles.bind(this);
        this.onClickArticle = this.onClickArticle.bind(this);
    }

    async componentDidMount() {
        const loggedInUserGeneralProfile = (await getUserProfileInfo()).generalProfile;
        const name = loggedInUserGeneralProfile.firstName + " " + loggedInUserGeneralProfile.lastName;
        this.setState({ name: name })
        await getTopHealthNews(this);
        this.getNewsArticles();
    }

    onClickArticle = (articleUrl) => {
        const win = window.open(articleUrl, '_blank');
    }

    getNewsArticles = () => {
        var newsArticleCards = [];
        for(var newsArticle of this.state.newsArticleArray) {
            newsArticleCards.push(
                <Card className="newsArticleCard" hoverable 
                    onClick={() => this.onClickArticle(newsArticle.url)}
                    cover={<img alt="newsArticleImage" src={newsArticle.urlToImage} />}
                >
                    <Meta title={newsArticle.title} description={newsArticle.description} />
                </Card>
            )
        }
        var newsArticleRows = [];
        newsArticleRows.push(<Row className="newsArticleRow"> {newsArticleCards.slice(0,3)} </Row>)
        console.log(newsArticleRows);
        this.setState({ newsArticleRowData: newsArticleRows})
    }

    render() {
        return (
            <div>
                <Header appComponent={this.props.appComponent}/>
                <NavBar appComponent={this.props.appComponent}/>

                <div className="container2">
                    <div className="dashboardWelcomeContainer">
                        <Row gutter>
                            <img className="dashboardBackgroundImage" alt="online-report-image" src={backgroundPic}/>
                        </Row>
                        <h1 className="dashboardWelcomeMessage">Welcome to MedPort, {this.state.name}!</h1>
                    </div>
                    <h2 className="newsSectionTitle">Health News Articles</h2>
                    {this.state.newsArticleRowData}
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);
