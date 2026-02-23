export const getUserProfile = async (req, res, next) => {
  try {
    // O middleware 'authorize' já colocou o usuário dentro de 'req.user'
    const user = req.user;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};