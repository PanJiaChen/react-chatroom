import Lightbox from 'react-images';

var Thumbnail = React.createClass({
	displayName: 'Thumbnail',
	propTypes: {
		images: React.PropTypes.array,
	},
	getInitialState () {
		return {
			lightboxIsOpen: false,
		};
	},
	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			lightboxIsOpen: true,
			lightboxInitialImage: index,
		});
	},
	closeLightbox () {
		this.setState({
			lightboxIsOpen: false,
		});
	},
	render () {
		return (
			<div className="section">
				<img className='thumbnail' onClick={(event) => this.openLightbox(0, event)} src={this.props.showImg} />
				<Lightbox
					images={this.props.images}
					initialImage={this.state.lightboxInitialImage}
					isOpen={this.state.lightboxIsOpen}
					onClose={this.closeLightbox}
					styles={this.props.styles} />
			</div>
		);
	}
});

const THUMBNAIL_SIZE = 58;

const styles = {
	gallery: {
		marginLeft: -5,
		marginRight: -5,
		overflow: 'hidden',
	},
	thumbnail: {
		backgroundSize: 'cover',
		borderRadius: 3,
		float: 'left',
		height: THUMBNAIL_SIZE,
		margin: 5,
		overflow: 'hidden',
		width: THUMBNAIL_SIZE,
	},
	thumbnailImage: {
		display: 'block',
		height: THUMBNAIL_SIZE,
		left: '50%',
		position: 'relative',

		WebkitTransform: 'translateX(-50%)',
		MozTransform:    'translateX(-50%)',
		msTransform:     'translateX(-50%)',
		transform:       'translateX(-50%)',
	},
};

export default Thumbnail;
