import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
  PDFDownloadLink,
  BlobProvider,
  pdf
} from "@react-pdf/renderer";
import { Button } from "react-bootstrap";
import { Document as PDFDisplay } from "react-pdf";

export const Report = () => {
  return (
    <Document
      title="Report"
      author="Trelleborg Offshore Norway AS"
      creator="Trelleborg Offshore Norway AS"
      producer="Trelleborg Offshore Norway AS"
      subject="Coating Report"
      keywords="coating report trelleborg offshore norway as"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
      {/* <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Coating Report</Text>
        </View>
        <Text style={styles.subtitle}>
          Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo
          D. Quijote de la Mancha
        </Text>
        <Text style={styles.text}>
          En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
          mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
          antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
          carnero, salpicón las más noches, duelos y quebrantos los sábados,
          lentejas los viernes, algún palomino de añadidura los domingos,
          consumían las tres partes de su hacienda. El resto della concluían
          sayo de velarte, calzas de velludo para las fiestas con sus pantuflos
          de lo mismo, los días de entre semana se honraba con su vellori de lo
          más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una
          sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que
          así ensillaba el rocín como tomaba la podadera. Frisaba la edad de
          nuestro hidalgo con los cincuenta años, era de complexión recia, seco
          de carnes, enjuto de rostro; gran madrugador y amigo de la caza.
          Quieren decir que tenía el sobrenombre de Quijada o Quesada (que en
          esto hay alguna diferencia en los autores que deste caso escriben),
          aunque por conjeturas verosímiles se deja entender que se llama
          Quijana; pero esto importa poco a nuestro cuento; basta que en la
          narración dél no se salga un punto de la verdad
        </Text>
      </Page> */}
    </Document>
  );
};

export const ReportDownload = props => {
  return (
    <PDFDownloadLink document={<Report />} {...props}>
      {({ blob, url, loading, error }) => {
        return (
          <Button variant={"success"} className="w-100" disabled={loading}>
            {loading ? "Loading..." : props.children}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default () => {
  return (
    <>
      <BlobProvider document={Report}>
        {({ blob, url, loading, error }) => {
          if (error) {
            return <div>error</div>;
          }
          //   return loading ? "Loading..." : <PDFDisplay file={url}></PDFDisplay>;
          console.log("URL:", url);

          return <PDFDisplay file={url}></PDFDisplay>;
        }}
      </BlobProvider>
      <PDFViewer
        className="w-100"
        style={{ maxHeight: "calc(100vh - 200px)", height: 1000 }}
      >
        <Report></Report>
      </PDFViewer>
    </>
  );
  //   return (
  //     <PDFViewer
  //       className="w-100"
  //       style={{ maxHeight: "calc(100vh - 180px)", height: 1000 }}
  //     >
  //       <Report></Report>
  //     </PDFViewer>
  //   );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald"
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald"
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey"
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey"
  }
});