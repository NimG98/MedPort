/*  
	programatically redirects to path, by replacing the current path in
	the history prop instead of pushing a new path, in order to maintain
	persistance of the global, app component state.

	component: a reference to the component where the action is taking place
	
	path: a url path defined in the app component BrowserRouter 

    Note: the component were the action is taking place must be wrapped in 
	      withRouter to make use of the history prop.
*/
export const redirect = (component, path) => {
	component.props.history.replace(path);
}