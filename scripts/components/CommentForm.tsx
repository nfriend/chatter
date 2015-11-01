module Chatter {
	
	export interface CommentFormProps {
		
	}
	
	export class CommentForm extends React.Component<CommentFormProps, any> {
		constructor(props:CommentFormProps) {
			super(props);
		}
		
		render() {
			return (
				<div className="commentForm">
					Hello, world! I am a CommentForm
				</div>
			);
		}
	}
}