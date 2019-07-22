const form = document.getElementById('vote-form');
const drop_db_entry = document.getElementById('drop-all');
var event;

drop_db_entry.addEventListener('click', e=>{
    const data = {delete: 1};
    if(confirm("Please confirm Drop all votes?")){
        console.log("drop all called");
        fetch('https://tch-monthly-rr-new.run.goorm.io/poll/drop',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .catch(err => console.log(err));
        
        fetch("https://tch-monthly-rr-new.run.goorm.io/poll")
    .then(res => res.json())
    .then(data => {
        let votes = data.votes;
        let totalVotes = votes.length;
        document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

        let voteCounts = {
            yes: 0,
            no: 0,
        };

        voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.contrib] = (acc[vote.contrib] || 0) + parseInt(vote.points)), acc),
            {}
        );

        let dataPoints = [
            { label: 'yes', y: voteCounts.yes },
            { label: 'no', y: voteCounts.no }
        ];
            
        const chartContainer = document.querySelector('#chartContainer');
        
        if(chartContainer){

            // Listen for the event.
            document.addEventListener('votesAdded', function (e) { 
                document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
            });
            
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                data:[
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        
             // Enable pusher logging - don't include this in production
             Pusher.logToConsole = true;
        
             var pusher = new Pusher("b9725d4a855e8d978bd1", {
               cluster: 'ap2',
               encrypted: true
             });
         
             var channel = pusher.subscribe('contrib-poll');

             channel.bind('contrib-vote', function(data) {
               dataPoints.forEach((point)=>{
                   if(point.label==data.contrib)
                   {
                        point.y+=data.points;
                        totalVotes+=data.points;
                        event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
                        // Dispatch the event.
                        document.dispatchEvent(event);
                   }
               });
               chart.render();
             });
        }

});
        
        alert("All Votes Dropped");
    }
    else{
        console.log("False Alarm");
    }
});

form.addEventListener('submit', e=>{
    
    const choice = document.querySelector('input[name=contrib]:checked').value;
    const data = {contrib: choice}; 

    fetch('https://tch-monthly-rr-new.run.goorm.io/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .catch(err => console.log(err));

    e.preventDefault();
    
    fetch("https://tch-monthly-rr-new.run.goorm.io/poll")
    .then(res => res.json())
    .then(data => {
        let votes = data.votes;
        let totalVotes = votes.length;
        document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

        let voteCounts = {
            yes: 0,
            no: 0,
        };

        voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.contrib] = (acc[vote.contrib] || 0) + parseInt(vote.points)), acc),
            {}
        );

        let dataPoints = [
            { label: 'yes', y: voteCounts.yes },
            { label: 'no', y: voteCounts.no }
        ];
            
        const chartContainer = document.querySelector('#chartContainer');
        
        if(chartContainer){

            // Listen for the event.
            document.addEventListener('votesAdded', function (e) { 
                document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
            });
            
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                data:[
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        
             // Enable pusher logging - don't include this in production
             Pusher.logToConsole = true;
        
             var pusher = new Pusher("b9725d4a855e8d978bd1", {
               cluster: 'ap2',
               encrypted: true
             });
         
             var channel = pusher.subscribe('contrib-poll');

             channel.bind('contrib-vote', function(data) {
               dataPoints.forEach((point)=>{
                   if(point.label==data.contrib)
                   {
                        point.y+=data.points;
                        totalVotes+=data.points;
                        event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
                        // Dispatch the event.
                        document.dispatchEvent(event);
                   }
               });
               chart.render();
             });
        }

});
});

fetch("https://tch-monthly-rr-new.run.goorm.io/poll")
    .then(res => res.json())
    .then(data => {
        let votes = data.votes;
        let totalVotes = votes.length;
        document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

        let voteCounts = {
            yes: 0,
            no: 0,
        };

        voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.contrib] = (acc[vote.contrib] || 0) + parseInt(vote.points)), acc),
            {}
        );

        let dataPoints = [
            { label: 'yes', y: voteCounts.yes },
            { label: 'no', y: voteCounts.no }
        ];
            
        const chartContainer = document.querySelector('#chartContainer');
        
        if(chartContainer){

            // Listen for the event.
            document.addEventListener('votesAdded', function (e) { 
                document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
            });
            
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                data:[
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        
             // Enable pusher logging - don't include this in production
             Pusher.logToConsole = true;
        
             var pusher = new Pusher("b9725d4a855e8d978bd1", {
               cluster: 'ap2',
               encrypted: true
             });
         
             var channel = pusher.subscribe('contrib-poll');

             channel.bind('contrib-vote', function(data) {
               dataPoints.forEach((point)=>{
                   if(point.label==data.contrib)
                   {
                        point.y+=data.points;
                        totalVotes+=data.points;
                        event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
                        // Dispatch the event.
                        document.dispatchEvent(event);
                   }
               });
               chart.render();
             });
        }

});

