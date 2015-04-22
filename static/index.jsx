/** @jsx React.DOM */

React.render(
    <h1>Responsive Vertical Timeline</h1>
    , document.getElementById('cd-header'));
var TimelineBlock = React.createClass({
    render: (function () {
        var muloNode = this.props.data.map(function (mulo) {
            return (
                <div className="cd-timeline-block" >
                    <div className="cd-timeline-img cd-movie">
                        <img src="img/cd-icon-movie.svg" alt="Movie"/>
                    </div>
                    <div className="cd-timeline-content">
                        <h2>Final Section</h2>
                        <p>{mulo.id}{mulo.text}</p>
                        <span className="cd-date">{mulo.date}</span>
                    </div>
                </div>
            );
        });
        return (
            <div className="muloList">
        {muloNode}
            </div>
        );
    }
    )
});
var Timeline = React.createClass({

    getInitialState: function () {
        this.idx = 0;
        this.lastRequestTimestamp = 0;
        this.window = $(window);
        $(document).on('scroll', this.onScroll);
        return {data: []};
    },
    onScroll: function () {
        if (!this.isLoading) {
            var closeToBottom = (this.window.scrollTop() + this.window.height() > this.window.height() - 100);
            console.log(this.window.scrollTop(), this.window.height());
            if (closeToBottom) {
                var currentTime = new Date().getTime();
                if (this.lastRequestTimestamp < currentTime - 1000) {
                    this.lastRequestTimestamp = currentTime;
                    this.loadNext();
                }
            }
        }
    },
    componentDidMount: function () {
        this.loadNext();
        ;
    },
    loadNext: function () {
        if (this.isLoading)
            return;
        this.isLoading = true;
        $.ajax({
            url: this.props.url + this.idx++,
            dataType: 'json',
            success: function (data) {
                this.isLoading = false;
                this.setState({data: this.state.data.concat(data)});
            }.bind(this),
            error: function (xhr, status, err) {
                this.isLoading = false;
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: (function () {
        return (
            <section id="cd-timeline" className="cd-container">
                <TimelineBlock data={this.state.data}/>
            </section>
        )
    })
});

React.render(
    <Timeline url ='/page?idx='/>,
    document.getElementById('timeline')
);



