import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const App = () => {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: `${process.env.REACT_APP_ALAN_API_KEY}`,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
          const article  = articles[parsedNumber - 1];
          
          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again.')
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          }
        }
      }
    })
  }, [])

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src='https://alan.app/voice/images/previews/preview.jpg' className={classes.alanLogo} alt="Alan Logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
