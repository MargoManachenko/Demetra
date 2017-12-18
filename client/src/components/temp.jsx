

  ProcessPhase(){
    const formData = `nightID=${this.props.night._id}`;

    console.log(formData);

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/night/isPhase');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
          this.setState({
            isPhase: xhr.response.isPhase
        });
          console.log(123);
          console.log(this.state.isPhase);
        let request; 

        if(this.state.isPhase){
          console.log("is phase. need to end");
          request = '/endPhase';
        }
        else{
          console.log("no phase. need to start");
          request = '/startPhase';
        }

        const formData2 = `nightID=${this.props.night._id}`;

        const xhr2 = new XMLHttpRequest();
        xhr2.open('post', '/night'+request);
        xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr2.responseType = 'json';
        xhr2.addEventListener('load', () => {
          if (xhr2.status === 200) {
              this.setState({
                successMessage: xhr.response.successMessage
            });
              console.log("ok");
          } else {
            console.log('error from Night');
          }
        });
        xhr2.send(formData2);

      } else {
        console.log('error from Night');
      }
    });
    xhr.send(formData);
  }

  <RaisedButton backgroundColor="#ffb347" label="Phase" onClick={this.ProcessPhase}/>