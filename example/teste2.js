/*const http = require('follow-redirects').http;
const path = require('path');
const util = require('../lib/util');
const axios = require('axios');
var fs = require('fs');
var request = require('request'); /**/
//import http from 'http';
const axios = require("axios");
//import url from 'url';
//import request from 'request';
//import fetch from 'node-fetch';
const cheerio = require("cheerio");

//const { Console } = require('console');

// Get the URL to download Megasena
var _getUrlMegaSena = async function () {
  try {
    let diretorioTemporario = path.resolve(path.join("example", "temp"));
    const url =
      "http://loterias.caixa.gov.br/wps/portal/loterias/landing/quina";
    const homePageMegaSena = await util.downloadResultados(
      diretorioTemporario,
      url,
      "",
      "homePageMegasena_pegar_url_download_resultados.html"
    );
    let cheerio = require("cheerio");
    let html = await fs.readFileSync(homePageMegaSena, "latin1");

    const $ = cheerio.load(html);

    let downloadResultadosLink = $('a[class="title zeta"]');
    let baseUrlToDownload = $("base");

    let urlDownloadResultados =
      baseUrlToDownload.attr("href") + downloadResultadosLink.attr("href");
    console.log(urlDownloadResultados);

    //var novoDownload = await util.downloadResultados(diretorioTemporario, urlDownloadResultados, '', 'resultados.html');

    return urlDownloadResultados; /*
    console.log(novoDownload);

    try {
      await downloadFile(novoDownload, "C:/Users/dennn/Desktop/megasena/loterias-caixa-json/example/temp/resultados2.html");
      console.log("ok");
   */
  } catch (error) {
    console.log("_getUrlMegaSena(): Error>> ", error);
    throw error;
  }
};

async function x() {
  //var x = await util.getHtmlFromUrl('http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena');
  //var x = await getHtmlFromUrl('http://www.google.com.br', 'latin1');
  //var x = await _getUrlMegaSena();

  console.log("fim");
  console.log(x);

  console.log(Buffer.from("tést", "latin1").toString());
  console.log(Buffer.from("tést", "utf-8").toString());
}

async function a() {
  const htmlResponse = await axios.get(
    "http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena",
    { withCredentials: true, headers: { Cookie: "security=true;" } }
  );
  const $ = cheerio.load(htmlResponse.data);
  const concurso = 1234;
  // Obtem os campos que montam a URL para download
  let downloadResultadosLink = $('a[class="title zeta"]').attr("href");
  let baseUrlToDownload = $("base").attr("href");
  let urlBuscarResultado = $('input[id="urlBuscarResultado"]').attr("value");
  // Monta a URL e devolve
  let urlUltimoResultado = baseUrlToDownload + downloadResultadosLink;
  let urlDownloadTodosResultados = baseUrlToDownload + urlBuscarResultado;

  let urlConcursoFilter = baseUrlToDownload + urlBuscarResultado.replace("c=cacheLevelPage/=/",`c=cacheLevelPage//p=concurso=${concurso}?timestampAjax=${new Date().getTime()}`);

  console.log(
    `URL download Resultado concurso ${concurso}: `,
    urlConcursoFilter
  );
  console.log("URL download Ultimo Resultado: ", urlDownloadTodosResultados);
  console.log("URL download Resultados: ", urlDownloadTodosResultados);

  const htmlResultadoConcurso = await axios.get(urlConcursoFilter, {
    withCredentials: true,
    headers: {
      Cookie: "security=true;",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const htmlUltimoResultado = await axios.get(urlUltimoResultado, {
    withCredentials: true,
    headers: { Cookie: "security=true;" },
  });
  const htmlTodosResultados = await axios.get(urlDownloadTodosResultados, {
    withCredentials: true,
    headers: { Cookie: "security=true;" },
  });

  console.log(htmlResultadoConcurso.data);
  console.log(" ---------------------------- ");
  console.log(htmlUltimoResultado.data);
  console.log(" ---------------------------- ");
  console.log(htmlTodosResultados.data);
  console.log(" ---------------------------- ");
}

a();
