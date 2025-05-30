export class LoaderBase {

	constructor() {

		this.fetchOptions = {};
		this.workingPath = '';

	}

	load( ...args ) {

		console.warn( 'Loader: "load" function has been deprecated in favor of "loadAsync".' );
		return this.loadAsync( ...args );

	}

	loadAsync( url ) {

		return fetch( url, this.fetchOptions )
			.then( res => {

				if ( ! res.ok ) {

					throw new Error( `Failed to load file "${ url }" with status ${ res.status } : ${ res.statusText }` );

				}
				return res.arrayBuffer();

			} )
			.then( buffer => {

				if ( this.workingPath === '' ) {

					this.workingPath = this.workingPathForURL( url );

				}

				return this.parse( buffer );

			} );

	}

	resolveExternalURL( url ) {

		if ( /^[^\\/]/.test( url ) && ! /^http/.test( url ) ) {

			return this.workingPath + '/' + url;

		} else {

			return url;

		}

	}

	workingPathForURL( url ) {

		const splits = url.split( /[\\/]/g );
		splits.pop();
		const workingPath = splits.join( '/' );
		return workingPath + '/';

	}

	parse( buffer ) {

		throw new Error( 'LoaderBase: Parse not implemented.' );

	}

}
