const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = process.env.DATOCMS_READ_ONLY_API_TOKEN;

async function fetchCmsAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}


export async function getCarouselVisiveis() {
  const data = await fetchCmsAPI(`
    {
      allCarrocels(orderBy: seq_ASC, filter: {visivel: {eq: "true"}}) {
        seq
        descricao
        visivel
        imagem {
          url(imgixParams: {w: 500, h: 500, auto: format})
        }
      }
    }
  `);

  return data.allCarrocels;
}

export async function getAmostrasLogo() {
  const data = await fetchCmsAPI(`
  {
    allAmostras (orderBy: seq_ASC) {
      seq
      descricao
      imagem {
        url(imgixParams: {w: 200, h: 200, auto: format})
      }
      grupo {
        slug
      }
    }
  }
  `);

  //const responseData = data.allAmostras.map((s: any) => {
   // const amostra = s.imagem
   // amostra.seq = s.seq
    //console.log("amostra:",amostra)
    //return amostra
  //})
  

  return  data.allAmostras;
}


export default { getCarouselVisiveis, getAmostrasLogo };