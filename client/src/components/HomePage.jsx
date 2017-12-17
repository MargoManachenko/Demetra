import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';


const HomePage = () => (
<div>

<Card className="container" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>  
    <div className="homeBlock">
		<div className="homeBlockHeadingBig">
			<p>Dream better with GreatDreamer</p>
		</div>
	</div>
</Card>

<Card className="container" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>  
    <div className="homeBlock">
		<div className="homeBlockHeading">
			<p>Why dream better?</p>
		</div>
		<p>Dreams are one of the most universal and inspiring aspects of the human experience,
		and yet we spend little time discussing their impact on our daily lives. In the past,
		dreams were treated as windows into our subconscious, offering valuable guidance and insight.
		Modern research has since confirmed that dreams can lead to better moods, reduced stress, enhanced
		problem solving skills, and increased creativity. Yet somehow dreaming is still treated as an afterthought
		when discussing our overall well-being.</p>

		<p>We created GreatDreamer to reintroduce people to the benefits of dreaming.
		Using gentle, customizable light signals, Remee not only increases dream recall and vividness, 
		but helps unlock the world of lucid dreaming. Read on to find out how.</p>
	</div>
  </Card>

  <Card className="container" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white'}}>  
    <div className="homeBlock">
		<div className="homeBlockHeading">
			<p>What do we offer?</p>
		</div>
		<div className="homeBlockHeading2">
			<p>Night lights</p>
		</div>
		<p>GreatDreamer's rear-facing LEDs serve as your touchstone to the waking world. 
		Using motion sensors, light patterns are displayed throughout the night, targeting 
		your REM cycles where dreams most often occur. The patterns can be as gentle or as jarring, as
		 bright or as dim, and as long and brignt as you like. The more time you've spent tuning your light patterns 
		 the better success you'll have improving recall & clarity, and the closer you'll be to lucidity!</p>

		 <div className="img1">
		 <img src="static/lights.gif"/>
		 </div>

		 <div className="homeBlockHeading2">
			<p>Comfort zone</p>
		</div>
		<p>We listened closely to customer feedback to improve every aspect of the sleeping experience with GreatDreamer. 
		The flexible circuit is protected by a 2-ply foam shell: a durable inner layer laminated with a cushioning soft
		 foam outer layer. The foam inserts are aerated to allow for better airflow, reducing heat and sweat. The head strap 
		 is lighter and softer, with stronger materials. The nose cutout has been raised to help Remee sit more firmly against
		  your face. In short, we made the best sleeping mask in the world that much better!</p>
	</div>

	<img src="static/mask.png"/>


  </Card>
 </div>

);

export default HomePage;
