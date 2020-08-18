import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const App = () => {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: `${process.env.REACT_APP_ALAN_API_KEY}`,
      onCommand: ({ command, articles }) => {
        if(command === 'newHeadlines') {
          setNewsArticles(articles)
        }
      }
    })
  }, [])

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src='https://alan.app/voice/images/previews/preview.jpg' className={classes.alanLogo} alt="Alan Logo" />
      </div>
      <NewsCards articles={newsArticles} />
    </div>
  );
}

export default App;
