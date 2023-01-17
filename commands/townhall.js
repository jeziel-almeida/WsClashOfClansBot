const { isEmpty } = require('../utility');

module.exports = async (clash, parameters, command, prefix) => {
    if (isEmpty(parameters))
        return `Para o comando: _${command}_, você precisa digitar a tag, ex: _${prefix}centrodevila #L28QJJ0Q_`;
    
    try {

        const clanResponse = await clash.clanByTag(`#${parameters[0].replace('#', '')}`);
        const clanMembers = await Promise.all(clanResponse.memberList.map(async clanMember => await clash.playerByTag(clanMember.tag)));
        const townHalls = clanMembers.map(memberDetails => memberDetails.townHallLevel);
        const uniqueTownHalls = [...new Set(townHalls)].sort((a, b) => b - a)
        const townHallCount = uniqueTownHalls.map(th => `> Centro de Vila ${th}: ${townHalls.filter(townhall => townhall === th).length}\n`);
        const averageTownhall = townHalls.reduce((totalValue, itemValue) => totalValue + itemValue, 0) / townHalls.length;

        return (
            `${clanResponse.name} (${clanResponse.tag})\n\n` +
            `${townHallCount.join('')}\n` +
            `> Membros: ${clanResponse.members}\n` +
            `> Média CV: ${Math.ceil(averageTownhall)}`
        );

    } catch (error) {
        let errorMessage;

        switch (error.statusCode) {
            case 404:
                errorMessage = `Clã ${parameters[0]} não encontrado. Verifique se a tag está correta.`;
                break;
            default:
                errorMessage = `Algo deu errado com a requisição ${command}. Verifique se as informações estão corretas.`;
                console.log(error);
        }

        return errorMessage;
    }
    
}