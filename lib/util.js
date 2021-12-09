const axios = require("axios");
const cheerio = require("cheerio");

var _downHtml = async function (url) {
  // ¯\_(ツ)_/¯
  // Truque: O site da caixa exige o envio do ^security=true;^ para permitir o download (redirect)
  return axios.get(url, {
    withCredentials: true,
    headers: { Cookie: "security=true;" },
  });
};

var _downJson = async function (url) {
  return axios.get(url, {
    withCredentials: true,
    headers: {
      Cookie: "security=true;",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

const PATH_URL_LOTERIAS_CAIXA =
  "http://loterias.caixa.gov.br/wps/portal/loterias/landing/";
exports.URL_LOTERIAS_CAIXA = {
  megasena: `${PATH_URL_LOTERIAS_CAIXA}megasena`,
  lotofacil: `${PATH_URL_LOTERIAS_CAIXA}lotofacil`,
  quina: `${PATH_URL_LOTERIAS_CAIXA}quina`,
  lotomania: `${PATH_URL_LOTERIAS_CAIXA}lotomania`,
  timemania: `${PATH_URL_LOTERIAS_CAIXA}timemania`,
  duplaSena: `${PATH_URL_LOTERIAS_CAIXA}duplasena`,
  federal: `${PATH_URL_LOTERIAS_CAIXA}federal`,
  loteca: `${PATH_URL_LOTERIAS_CAIXA}loteca`,
  diaDeSorte: `${PATH_URL_LOTERIAS_CAIXA}diadesorte`,
  superSete: `${PATH_URL_LOTERIAS_CAIXA}supersete`,
};

/**
 * <strong>Faz o download dos resultados</strong>
 *
 * O Site da Caixa, no momento em que está sendo feita a biblioteca, guarda na TAG "base"
 * com ^class^ "title zeta" o inicio da URL, e no campo href o restante para realizar o download
 * Juntando as 2 partes é possivel fazer o download, mesmo com a troca de URL por parte do
 * do site da caixa
 *
 * Ex. "Zeta": <a href="dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0K85260Q5OIRSC420O4/res/id=historicoHTML/c=cacheLevelPage/=/" target="_blank" class="title zeta">Resultados da Quina por ordem de sorteio</a>
 * Ex. "base": <base href="http://loterias.caixa.gov.br/wps/portal/loterias/landing/quina/!ut/p/a1/jc69DoIwAATgZ_EJepS2wFgoaUswsojYxXQyTfgbjM9vNS4Oordd8l1yxJGBuNnfw9XfwjL78dmduIikhYFGA0tzSFZ3tG_6FCmP4BxBpaVhWQuA5RRWlUZlxR6w4r89vkTi1_5E3CfRXcUhD6osEAHA32Dr4gtsfFin44Bgdw9WWSwj/">
 * @param {*} url Deve ser a url principal para a página de download dos resultados, like: "http://loterias.caixa.gov.br/wps/portal/loterias/landing/quina" (exemplo 2021-10-07)
 * @returns html em string com os resultados
 */
exports.downloadResultadosCaixa = async function (url) {
  // Encontra a URL para download dos resultados
  const htmlResponse = await _downHtml(url);
  console.log("Dados: ", htmlResponse);
  const $ = cheerio.load(htmlResponse.data);

  // Obtém as partes para montar o Resultado
  let baseUrlToDownload = $("base");
  let downloadResultadosLink = $('a[class="title zeta"]');

  // Monta a URL e faz o download dos dados em memoria
  let urlDownloadResultados =
    baseUrlToDownload.attr("href") + downloadResultadosLink.attr("href");
  console.log("URL download: ", urlDownloadResultados);

  // retorna o html em memória (string)
  let resultados = await _downHtml(urlDownloadResultados);
  return resultados.data;
};

exports.downloadUltimoResultadoCaixa = async function (url) {
  // Encontra a URL para download dos resultados
  const htmlResponse = await _downHtml(url);
  console.log("Dados: ", htmlResponse);
  const $ = cheerio.load(htmlResponse.data);

  // Obtém as partes para montar o Resultado
  let baseUrlToDownload = $("base").attr("href");
  let urlBuscarResultado = $('input[id="urlBuscarResultado"]').attr("href");

  // Monta a URL e faz o download dos dados em memoria
  let urlDownloadResultado = baseUrlToDownload + urlBuscarResultado;
  console.log("URL download: ", urlDownloadResultado);

  // retorna o html em memória (string)
  let resultado = await _downJson(urlDownloadResultado);
  return resultado.data;
};

exports.downloadConcursoCaixa = async function (url, concurso) {
  // Encontra a URL para download dos resultados
  const htmlResponse = await _downHtml(url);
  console.log("Dados: ", htmlResponse);
  const $ = cheerio.load(htmlResponse.data);

  // Obtém as partes para montar o Resultado
  let baseUrlToDownload = $("base").attr("href");
  let urlBuscarResultado = $('input[id="urlBuscarResultado"]').attr("href");
  let urlConcursoFilter = `c=cacheLevelPage//p=concurso=${concurso}?timestampAjax=${new Date().getTime()}`;
  // Monta a URL e faz o download dos dados em memoria
  let urlDownloadConcurso =
    baseUrlToDownload +
    urlBuscarResultado.replace("c=cacheLevelPage/=/", urlConcursoFilter);
  console.log("URL download: ", urlDownloadConcurso);

  // retorna o html em memória (string)
  let resultado = await _downJson(urlDownloadConcurso);
  return resultado.data;
};

exports.downloadHtmlPage = _downHtml;

/**
 * Converte o texto do html da caixa para numero com decimais
 * @param {string} value valor string a ser convertido
 */
exports.parseToFloat = function (value, returnNaN) {
  if (value) {
    value = value.replace(/\./g, "");
    value = value.replace(/\,/g, ".");
  }
  if (returnNaN) {
    return parseFloat(value) == NaN ? value : parseFloat(value);
  }
  return isNaN(parseFloat(value)) ? value : parseFloat(value);
};

/**
 * Converte o texto do html da caixa para numero com decimais
 * @param {string} value valor string a ser convertido
 */
exports.parseToInt = function (value) {
  if (value && value.replace) {
    value = value.replace(/\./g, "");
    value = value.replace(/\,/g, ".");
  }
  return isNaN(parseInt(value)) ? value : parseInt(value);
};
