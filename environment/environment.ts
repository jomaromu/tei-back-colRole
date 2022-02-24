const rolesColaborador = {
    produccionNormal: 'ProduccionNormalRole',
    produccionVIP: 'ProduccionVIPRole',
    VendedorVIPRole: 'VendedorVIPRole',
    VendedorNormalRole: 'VendedorNormalRole',
    DiseniadorRole: 'DiseniadorRole',
    DiseniadorvipRole: 'DiseniadorvipRole',
    AdminRole: 'AdminRole',
}

export const environmnet = {
    port: Number(process.env.puerto) || 3013,
    SEED: 'todo-en-impresiones',
    emailSuper: 'super@super.com',
    passSuper: '12345678',
    colaborador_role: 'SuperRole',
    colRole: rolesColaborador
}
