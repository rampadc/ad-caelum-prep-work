const request = require("request-promise");
var Db = require('mongodb').Db,
MongoClient = require('mongodb').MongoClient;

var nasa_norads = [
  "42775",
  "43600",
  "41785",
  "36798",
  "43152",
  "28890",
  "41787",
  "40014",
  "29108",
  "28649",
  "29710",
  "32783",
  "36795",
  "41599",
  "41948",
  "43111",
  "40336",
  "42769",
  "41899",
  "33434",
  "37930",
  "43690",
  "29107",
  "36744",
  "27640",
  "29047",
  "29048",
  "29050",
  "29051",
  "29052",
  "31598",
  "32376",
  "37216",
  "36508",
  "41887",
  "41886",
  "41891",
  "41885",
  "41884",
  "41889",
  "41890",
  "41888",
  "39766",
  "35681",
  "40013",
  "43678",
  "25757",
  "40715",
  "40716",
  "40717",
  "24753",
  "25991",
  "28054",
  "35951",
  "41617",
  "41612",
  "41608",
  "41614",
  "41609",
  "41618",
  "41611",
  "41616",
  "41606",
  "41615",
  "41613",
  "41610",
  "42995",
  "42998",
  "42996",
  "42997",
  "41967",
  "41962",
  "41957",
  "41955",
  "41966",
  "41950",
  "41959",
  "41958",
  "41956",
  "41964",
  "41961",
  "41963",
  "41960",
  "41968",
  "41953",
  "41965",
  "41971",
  "41952",
  "41969",
  "41970",
  "41951",
  "39419",
  "44047",
  "37344",
  "41105",
  "38010",
  "38008",
  "38007",
  "38009",
  "25994",
  "28376",
  "27424",
  "40932",
  "33463",
  "38049",
  "43491",
  "37214",
  "39260",
  "41882",
  "42920",
  "43585",
  "40118",
  "41727",
  "41194",
  "40701",
  "40894",
  "43259",
  "43260",
  "43262",
  "43461",
  "43484",
  "43065",
  "41579",
  "33331",
  "43823",
  "41602",
  "38337",
  "29155",
  "35491",
  "36411",
  "41866",
  "43226",
  "43672",
  "39574",
  "43476",
  "43477",
  "33492",
  "43609",
  "37781",
  "43655",
  "40267",
  "41836",
  "33320",
  "33321",
  "38997",
  "40299",
  "40015",
  "43719",
  "43613",
  "43114",
  "39216",
  "41752",
  "28051",
  "33105",
  "41240",
  "43946",
  "41914",
  "43022",
  "43023",
  "43024",
  "43943",
  "37839",
  "27525",
  "42825",
  "43180",
  "43181",
  "43876",
  "43877",
  "39731",
  "40010",
  "43676",
  "29268",
  "38338",
  "40536",
  "39227",
  "43118",
  "43767",
  "25682",
  "39084",
  "41603",
  "29709",
  "40933",
  "40934",
  "40932",
  "40935",
  "42838",
  "41873",
  "43125",
  "43697",
  "43882",
  "43889",
  "43126",
  "42842",
  "42840",
  "42837",
  "43885",
  "43182",
  "43184",
  "42774",
  "42780",
  "42773",
  "42779",
  "43123",
  "42782",
  "42839",
  "43887",
  "42841",
  "43124",
  "43884",
  "42781",
  "43888",
  "42771",
  "41872",
  "43185",
  "43883",
  "43183",
  "41874",
  "41871",
  "42772",
  "42845",
  "43886",
  "43695",
  "43944",
  "43034",
  "43080",
  "43146",
  "40958",
  "43485",
  "37838",
  "40069",
  "38552",
  "40732",
  "27509",
  "28912",
  "29499",
  "38771",
  "43689",
  "43128",
  "43015",
  "43717",
  "28937",
  "37789",
  "25338",
  "28654",
  "33591",
  "43013",
  "43619",
  "37849",
  "41557",
  "41558",
  "43195",
  "43204",
  "40059",
  "26702",
  "39650",
  "43440",
  "43530",
  "43215",
  "41770",
  "43132",
  "38012",
  "39019",
  "44072",
  "26958",
  "43529",
  "40301",
  "32382",
  "33314",
  "33312",
  "33315",
  "33316",
  "33313",
  "37791",
  "37387",
  "41877",
  "39186",
  "40360",
  "41386",
  "38248",
  "34807",
  "39769",
  "43641",
  "39086",
  "31118",
  "41790",
  "22491",
  "25504",
  "27858",
  "43437",
  "39634",
  "41456",
  "40697",
  "42063",
  "41335",
  "42969",
  "43175",
  "36596",
  "28220",
  "33433",
  "39455",
  "28893",
  "39418",
  "42990",
  "42989",
  "42988",
  "42987",
  "40072",
  "41601",
  "41771",
  "41772",
  "41773",
  "41774",
  "42992",
  "42991",
  "40376",
  "36036",
  "39768",
  "33496",
  "41900",
  "41901",
  "38755",
  "40053",
  "37841",
  "38011",
  "43618",
  "41907",
  "41908",
  "43099",
  "43100",
  "39452",
  "39451",
  "39453",
  "36605",
  "41898",
  "33396",
  "36985",
  "38256",
  "40988",
  "35683",
  "39767",
  "42901",
  "39160",
  "38782",
  "42954",
  "39423",
  "42835",
  "32060",
  "35946",
  "40115",
  "43944",
  "37389",
  "36834",
  "37165",
  "37875",
  "37941",
  "38257",
  "38354",
  "39011",
  "39012",
  "39013",
  "39239",
  "39240",
  "39241",
  "39363",
  "40109",
  "40110",
  "40111",
  "40143",
  "40275",
  "40305",
  "40310",
  "40338",
  "40339",
  "40340",
  "40362",
  "40878",
  "41026",
  "41038",
  "41473",
  "43277",
  "33446",
  "34839",
  "36110",
  "36121",
  "36413",
  "36414",
  "36415",
  "43275",
  "43276",
  "41857",
  "43909",
  "43910",
  "43911",
  "43912",
  "43913",
  "43915",
  "28470",
  "43194",
  "43439",
  "43441",
  "43442",
  "43443",
  "52761",
  "52759",
  "43440",
  "38038",
  "38046",
  "41556"
];
var nasa_cospar = [
  "2017-036L",
  "2018-066A",
  "2016-059C",
  "2010-035D",
  "2018-007A",
  "2005-043A",
  "2016-059E",
  "2014-033E",
  "2006-016B",
  "2005-017A",
  "2007-001B",
  "2008-021A",
  "2010-035A",
  "2016-040A",
  "2017-008A",
  "2018-004A",
  "2014-079A",
  "2017-036E",
  "2016-081B",
  "2008-056B",
  "2011-068A",
  "2018-088A",
  "2006-016A",
  "2010-032A",
  "2003-001A",
  "2006-011A",
  "2006-011B",
  "2006-011D",
  "2006-011E",
  "2006-011F",
  "2007-023A",
  "2007-059A",
  "2010-060A",
  "2010-013A",
  "2016-078D",
  "2016-078C",
  "2016-078H",
  "2016-078B",
  "2016-078A",
  "2016-078F",
  "2016-078G",
  "2016-078E",
  "2014-029A",
  "2009-041A",
  "2014-033D",
  "2018-084H",
  "1999-029B",
  "2015-032A",
  "2015-032B",
  "2015-032C",
  "1997-012A",
  "1999-067A",
  "2003-048A",
  "2009-057A",
  "2016-040U",
  "2016-040P",
  "2016-040K",
  "2016-040R",
  "2016-040L",
  "2016-040V",
  "2016-040N",
  "2016-040T",
  "2016-040H",
  "2016-040S",
  "2016-040Q",
  "2016-040M",
  "2017-068J",
  "2017-068M",
  "2017-068K",
  "2017-068L",
  "2017-008V",
  "2017-008Q",
  "2017-008K",
  "2017-008H",
  "2017-008U",
  "2017-008C",
  "2017-008M",
  "2017-008L",
  "2017-008J",
  "2017-008S",
  "2017-008P",
  "2017-008R",
  "2017-008N",
  "2017-008W",
  "2017-008F",
  "2017-008T",
  "2017-008Z",
  "2017-008E",
  "2017-008X",
  "2017-008Y",
  "2017-008D",
  "2013-066D",
  "2019-008A",
  "2011-001A",
  "2015-074A",
  "2011-076D",
  "2011-076B",
  "2011-076A",
  "2011-076C",
  "1999-068A",
  "2004-026A",
  "2002-022A",
  "2015-052C",
  "2008-066A",
  "2012-002A",
  "2018-050A",
  "2010-059A",
  "2013-052A",
  "2016-077A",
  "2017-049A",
  "2018-063A",
  "2014-049A",
  "2016-049A",
  "2015-083A",
  "2015-030A",
  "2015-047A",
  "2018-031A",
  "2018-031B",
  "2018-031D",
  "2018-043A",
  "2018-048A",
  "2017-082A",
  "2016-034A",
  "2008-042A",
  "2018-100A",
  "2016-040D",
  "2012-025A",
  "2006-018A",
  "2009-033A",
  "2010-008A",
  "2016-071A",
  "2018-022A",
  "2018-084B",
  "2014-009C",
  "2018-047A",
  "2018-047B",
  "2009-002A",
  "2018-068A",
  "2011-043A",
  "2018-081A",
  "2014-060A",
  "2016-064A",
  "2008-041A",
  "2008-041B",
  "2012-064A",
  "2014-070B",
  "2014-033F",
  "2018-096A",
  "2018-070A",
  "2018-004D",
  "2013-038B",
  "2016-054A",
  "2003-046A",
  "2008-032A",
  "2016-002A",
  "2019-005E",
  "2017-002B",
  "2017-074A",
  "2017-074B",
  "2017-074C",
  "2019-005B",
  "2011-058B",
  "2002-043A",
  "2017-042A",
  "2018-014A",
  "2018-014B",
  "2018-111A",
  "2018-111B",
  "2014-024A",
  "2014-033A",
  "2018-084F",
  "2006-031A",
  "2012-025B",
  "2015-014A",
  "2013-042A",
  "2018-004H",
  "2018-099K",
  "1999-020A",
  "2013-008A",
  "2016-040E",
  "2007-001A",
  "2015-052D",
  "2015-052E",
  "2015-052C",
  "2015-052F",
  "2017-042P",
  "2016-062E",
  "2018-004Q",
  "2018-088H",
  "2018-111G",
  "2018-111P",
  "2018-004R",
  "2017-042T",
  "2017-042R",
  "2017-042N",
  "2018-111K",
  "2018-014C",
  "2018-014E",
  "2017-036K",
  "2017-036R",
  "2017-036J",
  "2017-036Q",
  "2018-004N",
  "2017-036T",
  "2017-042Q",
  "2018-111M",
  "2017-042S",
  "2018-004P",
  "2018-111J",
  "2017-036S",
  "2018-111N",
  "2017-036G",
  "2016-062D",
  "2018-014F",
  "2018-111H",
  "2018-014D",
  "2016-062F",
  "2016-062C",
  "2017-036H",
  "2017-042W",
  "2018-111L",
  "2018-088F",
  "2019-005A",
  "2017-077A",
  "2017-084A",
  "2018-006A",
  "2015-057A",
  "2018-048B",
  "2011-058A",
  "2014-037A",
  "2012-035B",
  "2015-034A",
  "2002-040B",
  "2005-049B",
  "2006-044A",
  "2012-049A",
  "2018-087A",
  "2018-004T",
  "2017-073C",
  "2018-095A",
  "2006-004A",
  "2011-044B",
  "1998-030A",
  "2005-018A",
  "2009-005A",
  "2017-073A",
  "2018-071B",
  "2011-061A",
  "2016-033B",
  "2016-033C",
  "2018-015D",
  "2018-015K",
  "2014-035A",
  "2001-007A",
  "2014-019A",
  "2018-040B",
  "2018-056B",
  "2018-020A",
  "2016-058A",
  "2018-004X",
  "2011-076F",
  "2012-068A",
  "2019-015A",
  "2001-049B",
  "2018-056A",
  "2014-070D",
  "2007-061A",
  "2008-040C",
  "2008-040A",
  "2008-040D",
  "2008-040E",
  "2008-040B",
  "2011-044D",
  "2011-015A",
  "2016-074A",
  "2013-030A",
  "2014-087A",
  "2016-016A",
  "2012-017A",
  "2009-019A",
  "2014-029D",
  "2018-076A",
  "2013-009A",
  "2007-012B",
  "2016-059H",
  "1993-009B",
  "1998-060A",
  "2003-036A",
  "2018-039A",
  "2014-016A",
  "2016-025A",
  "2015-028A",
  "2017-013A",
  "2016-011A",
  "2017-064A",
  "2018-012B",
  "2010-027A",
  "2004-012A",
  "2008-056A",
  "2013-068A",
  "2005-043D",
  "2013-066C",
  "2017-068D",
  "2017-068C",
  "2017-068B",
  "2017-068A",
  "2014-037D",
  "2016-040C",
  "2016-058B",
  "2016-058C",
  "2016-058D",
  "2016-058E",
  "2017-068F",
  "2017-068E",
  "2015-003A",
  "2009-059A",
  "2014-029C",
  "2009-002E",
  "2016-081C",
  "2016-081D",
  "2012-047A",
  "2014-034A",
  "2011-058D",
  "2011-076E",
  "2018-071A",
  "2016-083A",
  "2016-083B",
  "2018-002A",
  "2018-002B",
  "2013-067B",
  "2013-067A",
  "2013-067C",
  "2010-030A",
  "2016-081A",
  "2008-049A",
  "2010-040A",
  "2012-020A",
  "2015-061A",
  "2009-041C",
  "2014-029B",
  "2017-044B",
  "2013-021B",
  "2012-052A",
  "2017-060A",
  "2013-066H",
  "2017-042L",
  "2007-041A",
  "2009-055A",
  "2014-048A",
  "2019-005C",
  "2011-015C",
  "2010-038A",
  "2010-047A",
  "2011-066B",
  "2011-072A",
  "2012-021A",
  "2012-029A",
  "2012-066A",
  "2012-066B",
  "2012-066C",
  "2013-046A",
  "2013-046B",
  "2013-046C",
  "2013-059A",
  "2014-047A",
  "2014-047B",
  "2014-047C",
  "2014-053A",
  "2014-063A",
  "2014-071A",
  "2014-072A",
  "2014-080A",
  "2014-080B",
  "2014-080C",
  "2014-088A",
  "2015-040A",
  "2015-064A",
  "2015-069A",
  "2016-029A",
  "2018-034C",
  "2008-061A",
  "2009-021A",
  "2009-069A",
  "2009-072A",
  "2010-009A",
  "2010-009B",
  "2010-009C",
  "2018-034A",
  "2018-034B",
  "2016-068A",
  "2018-112A",
  "2018-112B",
  "2018-112C",
  "2018-112D",
  "2018-112E",
  "2018-112G",
  "2004-044A",
  "2018-015C",
  "2018-040A",
  "2018-040C",
  "2018-040D",
  "2018-040E",
  "2017-034D",
  "2017-034B",
  "2018-040B",
  "2011-079A",
  "2012-001A",
  "2016-033A"
];

const tle_url = "https://data.ivanstanojevic.me/api/tle";
const data_url =
  "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=";


// return a promise of the result
function getTLE(norad) {
  return new Promise(resolve => {
    request(`${tle_url}/${norad}`, { json: true }).then(result => {
      resolve(result);
    });
  });
}

function getSatelliteData(cospar, cb) {
  request(`${data_url}/${cospar}`, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    cb(body);
  });
}

const uri =
  "mongodb+srv://writer:writer@caedum-0-aecpr.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.log('server error');
    console.log(err);
  }
  const collection = client.db("satellites").collection("data"); // perform actions on the collection object

  let i = 0;
  let progress = 0;
  const step = 4;
  const total = nasa_norads.length;
  // const total = 10;

  let intv = setInterval(() => {
    if (i < total) {
      for (let j = i; j < i + step; j++) {
          const norad = nasa_norads[j];
          const cospar = nasa_cospar[j];
        
          getTLE(norad).then(result => {
            var doc = {
              satelliteId: result["satelliteId"],
              name: result["name"],
              lines: [result["line1"], result["line2"]],
              dataUrl: `${data_url}/${cospar}`
            };
            collection.insertOne(doc, {}, function(err, result) {
              if (err) {
                console.log(err);
              } else {
                progress += 1;
                console.log(progress / total);
                if (progress >= total) {
                  console.log('Done');
                  client.close();
                  clearInterval(intv);
                }
              }
            });
          });
      } 
      i += 4;
    }
  }, 1000);
});
