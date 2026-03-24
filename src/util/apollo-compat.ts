// Compatibility shim for Apollo Client 4.x
// Provides ApolloError-like interface for @vue/apollo-composable
import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";

/**
 * ApolloError compatibility class for Apollo Client 4.x
 * Mimics Apollo Client 3.x ApolloError interface
 */
export class ApolloError extends Error {
	graphQLErrors: any[];
	networkError: Error | null;
	extraInfo: any | null;

	constructor(options: {
		graphQLErrors?: any[];
		networkError?: Error | null;
		errorMessage?: string;
		extraInfo?: any;
	}) {
		const { graphQLErrors = [], networkError = null, errorMessage = "", extraInfo = null } = options || {};

		super(errorMessage || networkError?.message || "" || "An error occurred");

		this.name = "ApolloError";
		this.graphQLErrors = graphQLErrors;
		this.networkError = networkError;
		this.extraInfo = extraInfo;
		this.message = errorMessage || this.message;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

/**
 * Check if error is an Apollo error (v3.x style or v4.x)
 */
export function isApolloError(error: any): error is ApolloError {
	if (!error) return false;

	// Check if it's our ApolloError class
	if (error instanceof ApolloError) return true;

	// Check for Apollo Client 4.x CombinedGraphQLErrors
	if (CombinedGraphQLErrors.is(error)) return true;

	// Check for Apollo Client 4.x ServerError
	if (ServerError.is(error)) return true;

	return false;
}

/**
 * Convert Apollo Client 4.x errors to ApolloError-like format
 */
export function toApolloErrorCompat(error: unknown): ApolloError {
	if (!(error instanceof Error)) {
		return new ApolloError({
			networkError: Object.assign(new Error(String(error)), { originalError: error }),
			errorMessage: String(error),
		});
	}

	if (isApolloError(error)) {
		// If it's already our ApolloError, return as is
		if (error instanceof ApolloError) return error;

		// Convert Apollo Client 4.x errors
		if (CombinedGraphQLErrors.is(error)) {
			return new ApolloError({
				graphQLErrors: Array.from(error.errors),
				errorMessage: error.message,
			});
		}

		if (ServerError.is(error)) {
			return new ApolloError({
				networkError: error,
				errorMessage: error.message,
			});
		}
	}

	return new ApolloError({
		networkError: error,
		errorMessage: error.message,
	});
}

/**
 * Convert GraphQL errors array to ApolloError-like format
 */
export function resultErrorsToApolloError(errors: any[]): ApolloError {
	return new ApolloError({
		graphQLErrors: errors,
		errorMessage: `GraphQL response contains errors: ${errors.map((e) => e.message).join(" | ")}`,
	});
}
