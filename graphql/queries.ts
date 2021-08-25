import { gql } from '@apollo/client';

export const GET_OPPORTUNITIES = gql`
	{
		posts(where: { categoryId: 34 }) {
			edges {
				node {
					title
					uri
					content
					seo {
						metaDesc
						metaKeywords
					}
				}
			}
		}
	}
`;

export const GET_NEWS = gql`
	{
		posts(where: { categoryId: 3 }, first: 20) {
			edges {
				node {
					title
					uri
					featuredImage {
						node {
							sourceUrl
						}
					}
					content
					id
				}
			}
		}
	}
`;

export const GET_NEWS_SEARCH = gql`
	{
		posts(first: 200) {
			edges {
				node {
					title
					uri
				}
			}
		}
	}
`;

export const GET_PUBS = gql`
	{
		publicites {
			edges {
				node {
					title
					uri
					featuredImage {
						node {
							sourceUrl
						}
					}
				}
			}
		}
	}
`;

export const GET_BREAKING_NEWS = gql`
	{
		breakingNews {
			edges {
				node {
					title
					uri
				}
			}
		}
	}
`;

export const GET_CONTACT = gql`
	{
		contacts {
			edges {
				node {
					title
					featuredImage {
						node {
							mediaItemUrl
							sourceUrl
						}
					}
					uri
					roles {
						edges {
							node {
								name
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_POSTS = (name) => {
	return gql`
	{
		posts(where: { categoryName: "${name}" }, first: 20) {
			edges {
				node {
					date
					title
					uri
					content
					featuredImage {
						node {
							mediaItemUrl
						}
					}
				}
			}
		}
	}
`;
};

export const GET_POSTS_HOME = (name) => {
	return gql`
	{
		posts(where: { categoryName: "${name}" }, first: 4) {
			edges {
				node {
					date
					title
					uri
					content
					featuredImage {
						node {
							mediaItemUrl
						}
					}
				}
			}
		}
	}
`;
};

export const GET_POSTS_SLUG = (slug) => gql`
{
  post(id: "${slug}", idType: URI) {
	 id
    databaseId
    title
    content
    date
    commentCount
    uri
     featuredImage {
      node {
        mediaItemUrl
        sourceUrl
        seo {
          metaKeywords
        }
        altText
      }
    }
    author {
      node {
        name
      }
    }
    comments {
      edges {
        node {
          date
          content
          author {
            node {
              name
            }
          }
        }
      }
    }
    excerpt(format: RENDERED)
  }
}
`;

export const GET_CATEGORIES = gql`
	{
		menuItems(where: { location: PRIMARY }, first: 24) {
			edges {
				node {
					label
				}
			}
		}
	}
`;

export const GET_BREAKING_NEWS_POST = (slug) => gql`
	{
		breakingNew(
			id: "${slug}"
			idType: URI
		) {
			content
			featuredImage {
				node {
					mediaItemUrl
					sourceUrl
				}
			}
			title
			uri
			slug
		}
	}
`;

export const INSERT_COMMENT = (id, author, comment) => {
	return gql`
		mutation CREATE_COMMENT {
			createComment(
				input: {
					commentOn: ${id}
					content: "${comment}"
					author: "${author}"
				
				}
			) {
				success
			}
		}
	`;
};
